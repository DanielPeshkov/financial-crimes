package cache

import (
	"encoding/json"
	"fmt"
	"net"
	"strconv"
)

type LaunderingIndividual struct {
	Id           int              `json:"id"`
	ReportId     int64            `json:"reportId"`
	IndividualId int64            `json:"individualId"`
	Report       LaunderingReport `json:"report"`
	Individual   Individual       `json:"individual"`
}

type LaunderingIndividualsResponse struct {
	Response   []LaunderingIndividual `json:"response"`
	IsDisposed bool                   `json:"isDisposed"`
	Id         string                 `json:"id"`
}

type LaunderingIndividualResponse struct {
	LaunderingIndividual LaunderingIndividual `json:"response"`
	IsDisposed           bool                 `json:"isDisposed"`
	Id                   string               `json:"id"`
}

type LaunderingIndividualData struct {
	Id   string               `json:"id"`
	Body LaunderingIndividual `json:"body"`
}

type PutLaunderingIndividualRequest struct {
	Pattern Pattern                  `json:"pattern"`
	Data    LaunderingIndividualData `json:"data"`
	Id      string                   `json:"id"`
}

func ParseLaunderingIndividualsResponse(msg []byte) []LaunderingIndividual {
	launderingindividual := LaunderingIndividualsResponse{}
	err := json.Unmarshal(msg, &launderingindividual)
	if err != nil {
		fmt.Println(err)
	}
	return launderingindividual.Response
}

func ParseLaunderingIndividualResponse(msg []byte) LaunderingIndividual {
	launderingindividual := LaunderingIndividualResponse{}
	err := json.Unmarshal(msg, &launderingindividual)
	if err != nil {
		fmt.Println(err)
	}
	return launderingindividual.LaunderingIndividual
}

func ParsePutLaunderingIndividualRequest(msg []byte) (interface{}, string, int) {
	launderingindividual := PutLaunderingIndividualRequest{}
	err := json.Unmarshal(msg, &launderingindividual)
	if err != nil {
		fmt.Println(err)
	}
	return launderingindividual, launderingindividual.Data.Id, launderingindividual.Data.Body.Id
}

func (c *Cache) LoadLaunderingIndividual(conn net.Conn) {
	buf := make([]byte, 8192)
	conn.Write([]byte(`90#{"pattern":{"path":"get/laundering/individual"},"data":"","id":"loadlaunderingindividual"}`))
	n, err := conn.Read(buf)
	if err != nil {
		panic(fmt.Sprintf("Failed to load LaunderingIndividual table: %s", err))
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
	launderingindividuals := ParseLaunderingIndividualsResponse(msg[delimiter:])
	for _, ind := range launderingindividuals {
		c.LaunderingIndividuals[int64(ind.Id)] = ind
	}
}

func NestLaunderingIndividual(c *Cache, obj interface{}) interface{} {
	ind, ok := obj.(LaunderingIndividual)
	if !ok {
		return obj
	}
	if ind.ReportId != 0 {
		ind.Report = c.LaunderingReports[ind.ReportId]
	} else {
		ind.Report = LaunderingReport{}
	}
	if ind.IndividualId != 0 {
		ind.Individual = c.Individuals[ind.IndividualId]
	} else {
		ind.Individual = Individual{}
	}
	return ind
}

func (c *Cache) PostLaunderingIndividual(conn net.Conn, buf, data, reqId []byte) ([]byte, int) {
	buf, i, n := Post(c.LaunderingIndividuals, conn, buf, data)
	launderingindividual := ParseLaunderingIndividualResponse(buf[i:n])
	c.LaunderingIndividuals[int64(launderingindividual.Id)] = launderingindividual
	return buf, n
}

func PutLaunderingIndividualVal(p interface{}, b interface{}) interface{} {
	put := p.(PutLaunderingIndividualRequest)
	launderingindividual := b.(LaunderingIndividual)
	if put.Data.Body.ReportId != 0 {
		launderingindividual.ReportId = put.Data.Body.ReportId
	}
	if put.Data.Body.IndividualId != 0 {
		launderingindividual.IndividualId = put.Data.Body.IndividualId
	}
	/*
		Add logic to save changes to report and individual
	*/

	return launderingindividual
}
