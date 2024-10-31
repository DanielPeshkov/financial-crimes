package main

import (
	"cache/cache"
	"fmt"
	"net"
	"os"
	"strconv"
	"time"
	"unicode"

	"github.com/joho/godotenv"
	amqp "github.com/rabbitmq/amqp091-go"
)

type Server struct {
	listenAddr string
	ln         net.Listener
	quit       chan struct{}
	cache      cache.Cache
	queue      *amqp.Channel
}

func NewServer(listenAddr string) *Server {
	return &Server{
		listenAddr: listenAddr,
		quit:       make(chan struct{}),
		cache: cache.Cache{
			Users:                   make(map[int64]cache.User),
			Contacts:                make(map[int64]cache.Contact),
			Addresses:               make(map[int64]cache.Address),
			Individuals:             make(map[int64]cache.Individual),
			Businesses:              make(map[int64]cache.Business),
			OtherReports:            make(map[int64]cache.OtherReport),
			OtherIndividuals:        make(map[int64]cache.OtherIndividual),
			OtherBusinesses:         make(map[int64]cache.OtherBusiness),
			LaunderingReports:       make(map[int64]cache.LaunderingReport),
			LaunderingIndividuals:   make(map[int64]cache.LaunderingIndividual),
			LaunderingBusinesses:    make(map[int64]cache.LaunderingBusiness),
			InstitutionReports:      make(map[int64]cache.InstitutionReport),
			InstitutionIndividuals:  make(map[int64]cache.InstitutionIndividual),
			InstitutionBusinesses:   make(map[int64]cache.InstitutionBusiness),
			MortgageReports:         make(map[int64]cache.MortgageReport),
			MortgageIndividuals:     make(map[int64]cache.MortgageIndividual),
			MortgageBusinesses:      make(map[int64]cache.MortgageBusiness),
			InvestmentReports:       make(map[int64]cache.InvestmentReport),
			InvestmentIndividuals:   make(map[int64]cache.InvestmentIndividual),
			InvestmentBusinesses:    make(map[int64]cache.InvestmentBusiness),
			EmbezzlementReports:     make(map[int64]cache.EmbezzlementReport),
			EmbezzlementIndividuals: make(map[int64]cache.EmbezzlementIndividual),
			EmbezzlementBusinesses:  make(map[int64]cache.EmbezzlementBusiness),
		},
	}
}

func (s *Server) Start() error {
	ln, err := net.Listen("tcp", s.listenAddr)
	if err != nil {
		return err
	}
	fmt.Println("Server is running")
	defer ln.Close()
	s.ln = ln

	// Load cache from DB
	dbConn, err := net.Dial("tcp", os.Getenv("DB"))
	if err != nil {
		return fmt.Errorf("failed to connect to db: %s", err)
	}
	s.cache.Load(dbConn)
	dbConn.Close()

	// Connect to RabbitMQ
	queue, err := amqp.Dial(os.Getenv("RABBIT"))
	if err != nil {
		return fmt.Errorf("failed to connect to queue: %s", err)
	}
	defer queue.Close()
	qch, err := queue.Channel()
	if err != nil {
		return fmt.Errorf("failed to connect to queue channel: %s", err)
	}
	defer qch.Close()
	s.queue = qch
	fmt.Println("Connected to RabbitMQ")

	go s.acceptLoop()
	<-s.quit
	return nil
}

func (s *Server) acceptLoop() {
	for {
		conn, err := s.ln.Accept()
		if err != nil {
			fmt.Println("Error accepting connection:", err)
			continue
		}

		fmt.Println("new connection to the server: ", conn.RemoteAddr())
		go s.readLoop(conn)
	}
}

func (s *Server) readLoop(conn net.Conn) {
	// Create connection to DB microservice
	dbConn, err := net.Dial("tcp", os.Getenv("DB"))
	if err != nil {
		fmt.Println("forward connection error: ", err)
		return
	}
	defer dbConn.Close()

	// Communication loop
	defer conn.Close()
	buf1 := make([]byte, 2048)
	buf2 := make([]byte, 262144)
	for {
		// Read gateway request
		n, err := conn.Read(buf1)
		if err != nil {
			if n == 0 {
				fmt.Println("closing connection to:", conn.RemoteAddr())
				conn.Close()
				return
			}
			fmt.Println("read error: ", err)
			continue
		}

		// Forward request to DB Service
		msg1 := buf1[:n]
		data, ts, req, id, reqId := parseRequest(msg1)
		// Measure DB response time
		start := time.Now()

		msg2, len := s.cache.Query(dbConn, buf2, data, req, reqId, id)
		msg2 = msg2[:len]
		// Measure DB response time
		elapsed := time.Since(start)
		conn.Write(msg2)

		// Log cache hit or miss
		hit := 1
		if string(req[:3]) == "pos" {
			hit = 0
		}

		// Log response time
		gateLat := start.UnixMilli() - ts
		reqLat := elapsed
		// timestamp, gateway latency: ms, request latency: us, cache hit
		out := fmt.Sprintf("%d,%d,%d,%d", start.Unix(), gateLat, reqLat.Microseconds(), hit)

		err = s.queue.Publish("", "logs", false, false, amqp.Publishing{
			ContentType: "text/plain",
			Body:        []byte(out),
		})
		if err != nil {
			fmt.Println("Error writing to queue: ", err)
		}
	}
}

func parseRequest(msg []byte) ([]byte, int64, []byte, int64, []byte) {
	i := 0
	for msg[i] != 35 {
		i += 1
	}
	length := len(msg) - i - 22
	i += 20
	ts, err := strconv.ParseInt(string(msg[i:i+13]), 10, 64)
	i += 14
	if err != nil {
		fmt.Println("timestamp error: ", err)
	}
	// Request Type extraction for cache validation
	j := i + 8
	for msg[j] != '"' {
		j += 1
	}
	req := msg[i+8 : j]

	for msg[j] != ':' {
		j += 1
	}
	j += 1
	k := j
	for unicode.IsDigit(rune(msg[k])) {
		k += 1
	}
	id := int64(0)
	if j != k {
		id, err = strconv.ParseInt(string(msg[j:k]), 10, 64)
		if err != nil {
			id = 0
		}
	}
	reqId := msg[len(msg)-23 : len(msg)-2]
	data := append([]byte(fmt.Sprintf(`%d#{"pattern":{`, length)), msg[i:]...)
	return data, ts, req, id, reqId
}

func main() {
	godotenv.Load()
	server := NewServer(os.Getenv("PORT"))
	server.Start()
}
