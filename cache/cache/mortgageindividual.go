package cache

import (
	"encoding/json"
	"fmt"
	"net"
	"strconv"
)

type MortgageIndividual struct {
	Id           int            `json:"id"`
	ReportId     int64          `json:"reportId"`
	IndividualId int64          `json:"individualId"`
	Report       MortgageReport `json:"report"`
	Individual   Individual     `json:"individual"`
}

type MortgageIndividualsResponse struct {
	Response   []MortgageIndividual `json:"response"`
	IsDisposed bool                 `json:"isDisposed"`
	Id         string               `json:"id"`
}

type MortgageIndividualResponse struct {
	MortgageIndividual MortgageIndividual `json:"response"`
	IsDisposed         bool               `json:"isDisposed"`
	Id                 string             `json:"id"`
}

type MortgageIndividualData struct {
	Id   string             `json:"id"`
	Body MortgageIndividual `json:"body"`
}

type PutMortgageIndividualRequest struct {
	Pattern Pattern                `json:"pattern"`
	Data    MortgageIndividualData `json:"data"`
	Id      string                 `json:"id"`
}

func ParseMortgageIndividualsResponse(msg []byte) []MortgageIndividual {
	mortgageindividual := MortgageIndividualsResponse{}
	err := json.Unmarshal(msg, &mortgageindividual)
	if err != nil {
		fmt.Println(err)
	}
	return mortgageindividual.Response
}

func ParseMortgageIndividualResponse(msg []byte) MortgageIndividual {
	mortgageindividual := MortgageIndividualResponse{}
	err := json.Unmarshal(msg, &mortgageindividual)
	if err != nil {
		fmt.Println(err)
	}
	return mortgageindividual.MortgageIndividual
}

func ParsePutMortgageIndividualRequest(msg []byte) (interface{}, string, int) {
	mortgageindividual := PutMortgageIndividualRequest{}
	err := json.Unmarshal(msg, &mortgageindividual)
	if err != nil {
		fmt.Println(err)
	}
	return mortgageindividual, mortgageindividual.Data.Id, mortgageindividual.Data.Body.Id
}

func (c *Cache) LoadMortgageIndividual(conn net.Conn) {
	buf := make([]byte, 8192)
	conn.Write([]byte(`86#{"pattern":{"path":"get/mortgage/individual"},"data":"","id":"loadmortgageindividual"}`))
	n, err := conn.Read(buf)
	if err != nil {
		panic(fmt.Sprintf("Failed to load MortgageIndividual table: %s", err))
	}
	msg := buf[:n]
	i := 0
	for msg[i] != '#' {
		i += 1
	}
	delimiter := i + 1
	total, _ := strconv.ParseInt(string(msg[:i]), 10, 64)
	read := n - i
	for read < int(total) {
		buf := make([]byte, 8192)
		n, err := conn.Read(buf)
		if err != nil {
			panic(fmt.Sprintf("Failed to load Address table: %s", err))
		}
		msg = append(msg, buf[:n]...)
		read += n
	}
	mortgageindividuals := ParseMortgageIndividualsResponse(msg[delimiter:])
	for _, ind := range mortgageindividuals {
		c.MortgageIndividuals[int64(ind.Id)] = ind
	}
}

func NestMortgageIndividual(c *Cache, obj interface{}) interface{} {
	ind, ok := obj.(MortgageIndividual)
	if !ok {
		return obj
	}
	if ind.ReportId != 0 {
		ind.Report = c.MortgageReports[ind.ReportId]
	} else {
		ind.Report = MortgageReport{}
	}
	if ind.IndividualId != 0 {
		ind.Individual = c.Individuals[ind.IndividualId]
	} else {
		ind.Individual = Individual{}
	}
	return ind
}

func (c *Cache) PostMortgageIndividual(conn net.Conn, buf, data, reqId []byte) ([]byte, int) {
	buf, i, n := Post(c.MortgageIndividuals, conn, buf, data)
	mortgageindividual := ParseMortgageIndividualResponse(buf[i:n])
	c.MortgageIndividuals[int64(mortgageindividual.Id)] = mortgageindividual
	return buf, n
}

func PutMortgageIndividualVal(p interface{}, b interface{}) interface{} {
	put := p.(PutMortgageIndividualRequest)
	mortgageindividual := b.(MortgageIndividual)
	if put.Data.Body.ReportId != 0 {
		mortgageindividual.ReportId = put.Data.Body.ReportId
	}
	if put.Data.Body.IndividualId != 0 {
		mortgageindividual.IndividualId = put.Data.Body.IndividualId
	}
	/*
		Add logic to save changes to report and individual
	*/

	return mortgageindividual
}
