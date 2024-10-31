package cache

import (
	"encoding/json"
	"fmt"
	"net"
)

type OtherIndividual struct {
	Id           int         `json:"id"`
	ReportId     int64       `json:"reportId"`
	IndividualId int64       `json:"individualId"`
	Report       OtherReport `json:"report"`
	Individual   Individual  `json:"individual"`
}

type OtherIndividualsResponse struct {
	Response   []OtherIndividual `json:"response"`
	IsDisposed bool              `json:"isDisposed"`
	Id         string            `json:"id"`
}

type OtherIndividualResponse struct {
	OtherIndividual OtherIndividual `json:"response"`
	IsDisposed      bool            `json:"isDisposed"`
	Id              string          `json:"id"`
}

type OtherIndividualData struct {
	Id   string          `json:"id"`
	Body OtherIndividual `json:"body"`
}

type PutOtherIndividualRequest struct {
	Pattern Pattern             `json:"pattern"`
	Data    OtherIndividualData `json:"data"`
	Id      string              `json:"id"`
}

func ParseOtherIndividualsResponse(msg []byte) []OtherIndividual {
	otherindividual := OtherIndividualsResponse{}
	err := json.Unmarshal(msg, &otherindividual)
	if err != nil {
		fmt.Println(err)
	}
	return otherindividual.Response
}

func ParseOtherIndividualResponse(msg []byte) OtherIndividual {
	otherindividual := OtherIndividualResponse{}
	err := json.Unmarshal(msg, &otherindividual)
	if err != nil {
		fmt.Println(err)
	}
	return otherindividual.OtherIndividual
}

func ParsePutOtherIndividualRequest(msg []byte) (interface{}, string, int) {
	otherindividual := PutOtherIndividualRequest{}
	err := json.Unmarshal(msg, &otherindividual)
	if err != nil {
		fmt.Println(err)
	}
	return otherindividual, otherindividual.Data.Id, otherindividual.Data.Body.Id
}

func (c *Cache) LoadOtherIndividual(conn net.Conn) {
	buf := make([]byte, 16384)
	conn.Write([]byte(`80#{"pattern":{"path":"get/other/individual"},"data":"","id":"loadotherindividual"}`))
	n, err := conn.Read(buf)
	if err != nil {
		panic(fmt.Sprintf("Failed to load OtherIndividual table: %s", err))
	}
	msg := buf[:n]
	i := 0
	for msg[i] != '#' {
		i += 1
	}
	i += 1
	otherindividuals := ParseOtherIndividualsResponse(msg[i:])
	for _, ind := range otherindividuals {
		c.OtherIndividuals[int64(ind.Id)] = ind
	}
}

func NestOtherIndividual(c *Cache, obj interface{}) interface{} {
	ind, ok := obj.(OtherIndividual)
	if !ok {
		return obj
	}
	if ind.ReportId != 0 {
		ind.Report = c.OtherReports[ind.ReportId]
	} else {
		ind.Report = OtherReport{}
	}
	if ind.IndividualId != 0 {
		ind.Individual = c.Individuals[ind.IndividualId]
	} else {
		ind.Individual = Individual{}
	}
	return ind
}

func (c *Cache) PostOtherIndividual(conn net.Conn, buf, data, reqId []byte) ([]byte, int) {
	buf, i, n := Post(c.OtherIndividuals, conn, buf, data)
	otherindividual := ParseOtherIndividualResponse(buf[i:n])
	c.OtherIndividuals[int64(otherindividual.Id)] = otherindividual
	return buf, n
}

func PutOtherIndividualVal(p interface{}, b interface{}) interface{} {
	put := p.(PutOtherIndividualRequest)
	otherindividual := b.(OtherIndividual)
	if put.Data.Body.ReportId != 0 {
		otherindividual.ReportId = put.Data.Body.ReportId
	}
	if put.Data.Body.IndividualId != 0 {
		otherindividual.IndividualId = put.Data.Body.IndividualId
	}
	/*
		Add logic to save changes to report and individual
	*/

	return otherindividual
}
