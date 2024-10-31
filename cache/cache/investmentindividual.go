package cache

import (
	"encoding/json"
	"fmt"
	"net"
)

type InvestmentIndividual struct {
	Id           int              `json:"id"`
	ReportId     int64            `json:"reportId"`
	IndividualId int64            `json:"individualId"`
	Report       InvestmentReport `json:"report"`
	Individual   Individual       `json:"individual"`
}

type InvestmentIndividualsResponse struct {
	Response   []InvestmentIndividual `json:"response"`
	IsDisposed bool                   `json:"isDisposed"`
	Id         string                 `json:"id"`
}

type InvestmentIndividualResponse struct {
	InvestmentIndividual InvestmentIndividual `json:"response"`
	IsDisposed           bool                 `json:"isDisposed"`
	Id                   string               `json:"id"`
}

type InvestmentIndividualData struct {
	Id   string               `json:"id"`
	Body InvestmentIndividual `json:"body"`
}

type PutInvestmentIndividualRequest struct {
	Pattern Pattern                  `json:"pattern"`
	Data    InvestmentIndividualData `json:"data"`
	Id      string                   `json:"id"`
}

func ParseInvestmentIndividualsResponse(msg []byte) []InvestmentIndividual {
	investmentindividual := InvestmentIndividualsResponse{}
	err := json.Unmarshal(msg, &investmentindividual)
	if err != nil {
		fmt.Println(err)
	}
	return investmentindividual.Response
}

func ParseInvestmentIndividualResponse(msg []byte) InvestmentIndividual {
	investmentindividual := InvestmentIndividualResponse{}
	err := json.Unmarshal(msg, &investmentindividual)
	if err != nil {
		fmt.Println(err)
	}
	return investmentindividual.InvestmentIndividual
}

func ParsePutInvestmentIndividualRequest(msg []byte) (interface{}, string, int) {
	investmentindividual := PutInvestmentIndividualRequest{}
	err := json.Unmarshal(msg, &investmentindividual)
	if err != nil {
		fmt.Println(err)
	}
	return investmentindividual, investmentindividual.Data.Id, investmentindividual.Data.Body.Id
}

func (c *Cache) LoadInvestmentIndividual(conn net.Conn) {
	buf := make([]byte, 16384)
	conn.Write([]byte(`90#{"pattern":{"path":"get/investment/individual"},"data":"","id":"loadinvestmentindividual"}`))
	n, err := conn.Read(buf)
	if err != nil {
		panic(fmt.Sprintf("Failed to load InvestmentIndividual table: %s", err))
	}
	msg := buf[:n]
	i := 0
	for msg[i] != '#' {
		i += 1
	}
	i += 1
	investmentindividuals := ParseInvestmentIndividualsResponse(msg[i:])
	for _, ind := range investmentindividuals {
		c.InvestmentIndividuals[int64(ind.Id)] = ind
	}
}

func NestInvestmentIndividual(c *Cache, obj interface{}) interface{} {
	ind, ok := obj.(InvestmentIndividual)
	if !ok {
		return obj
	}
	if ind.ReportId != 0 {
		ind.Report = c.InvestmentReports[ind.ReportId]
	} else {
		ind.Report = InvestmentReport{}
	}
	if ind.IndividualId != 0 {
		ind.Individual = c.Individuals[ind.IndividualId]
	} else {
		ind.Individual = Individual{}
	}
	return ind
}

func (c *Cache) PostInvestmentIndividual(conn net.Conn, buf, data, reqId []byte) ([]byte, int) {
	buf, i, n := Post(c.InvestmentIndividuals, conn, buf, data)
	investmentindividual := ParseInvestmentIndividualResponse(buf[i:n])
	c.InvestmentIndividuals[int64(investmentindividual.Id)] = investmentindividual
	return buf, n
}

func PutInvestmentIndividualVal(p interface{}, b interface{}) interface{} {
	put := p.(PutInvestmentIndividualRequest)
	investmentindividual := b.(InvestmentIndividual)
	if put.Data.Body.ReportId != 0 {
		investmentindividual.ReportId = put.Data.Body.ReportId
	}
	if put.Data.Body.IndividualId != 0 {
		investmentindividual.IndividualId = put.Data.Body.IndividualId
	}
	/*
		Add logic to save changes to report and individual
	*/

	return investmentindividual
}
