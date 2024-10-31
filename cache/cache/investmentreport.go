package cache

import (
	"encoding/json"
	"fmt"
	"net"
)

type InvestmentReport struct {
	Id            int          `json:"id"`
	Amount        int          `json:"amount"`
	Loss          int          `json:"loss"`
	Force         bool         `json:"force"`
	Promise       string       `json:"promise"`
	Contract      bool         `json:"contract"`
	Method        string       `json:"method"`
	Funds         bool         `json:"funds"`
	Communication bool         `json:"communication"`
	Source        string       `json:"source"`
	Documentation bool         `json:"documentation"`
	Description   string       `json:"description"`
	ContactId     int64        `json:"contactId"`
	Status        int64        `json:"status"`
	Created       string       `json:"created"`
	Updated       string       `json:"updated"`
	Contact       Contact      `json:"contact"`
	Individuals   []Individual `json:"investmentindividual"`
	Businesses    []Business   `json:"investmentbusiness"`
}

type InvestmentReportsResponse struct {
	Response   []InvestmentReport `json:"response"`
	IsDisposed bool               `json:"isDisposed"`
	Id         string             `json:"id"`
}

type InvestmentReportResponse struct {
	InvestmentReport InvestmentReport `json:"response"`
	IsDisposed       bool             `json:"isDisposed"`
	Id               string           `json:"id"`
}

type InvestmentReportData struct {
	Id   string           `json:"id"`
	Body InvestmentReport `json:"body"`
}

type PutInvestmentReportRequest struct {
	Pattern Pattern              `json:"pattern"`
	Data    InvestmentReportData `json:"data"`
	Id      string               `json:"id"`
}

func ParseInvestmentReportsResponse(msg []byte) []InvestmentReport {
	investmentreport := InvestmentReportsResponse{}
	err := json.Unmarshal(msg, &investmentreport)
	if err != nil {
		fmt.Println(err)
	}
	return investmentreport.Response
}

func ParseInvestmentReportResponse(msg []byte) InvestmentReport {
	investmentreport := InvestmentReportResponse{}
	err := json.Unmarshal(msg, &investmentreport)
	if err != nil {
		fmt.Println(err)
	}
	return investmentreport.InvestmentReport
}

func ParsePutInvestmentReportRequest(msg []byte) (interface{}, string, int) {
	investmentreport := PutInvestmentReportRequest{}
	err := json.Unmarshal(msg, &investmentreport)
	if err != nil {
		fmt.Println(err)
	}
	return investmentreport, investmentreport.Data.Id, investmentreport.Data.Body.Id
}

func (c *Cache) LoadInvestmentReport(conn net.Conn) {
	buf := make([]byte, 16384)
	conn.Write([]byte(`83#{"pattern":{"path":"get/investment/report"},"data":"","id":"loadinvestment/report"}`))
	n, err := conn.Read(buf)
	if err != nil {
		panic(fmt.Sprintf("Failed to load InvestmentReport table: %s", err))
	}
	msg := buf[:n]
	i := 0
	for msg[i] != '#' {
		i += 1
	}
	i += 1
	investmentreports := ParseInvestmentReportsResponse(msg[i:])
	for _, ind := range investmentreports {
		c.InvestmentReports[int64(ind.Id)] = ind
	}
}

func NestInvestmentReport(c *Cache, obj interface{}) interface{} {
	rep, ok := obj.(InvestmentReport)
	if !ok {
		return obj
	}
	if rep.ContactId != 0 {
		rep.Contact = c.Contacts[rep.ContactId]
	} else {
		rep.Contact = Contact{}
	}
	rep.Individuals = []Individual{}
	for _, item := range c.OtherIndividuals {
		if item.ReportId == int64(rep.Id) {
			ind := c.Individuals[item.IndividualId]
			ind = NestIndividual(c, ind).(Individual)
			rep.Individuals = append(rep.Individuals, ind)
		}
	}
	rep.Businesses = []Business{}
	for _, item := range c.OtherBusinesses {
		if item.ReportId == int64(rep.Id) {
			bus := c.Businesses[item.BusinessId]
			bus = NestBusiness(c, bus).(Business)
			rep.Businesses = append(rep.Businesses, bus)
		}
	}
	return rep
}

func (c *Cache) PostInvestmentReport(conn net.Conn, buf, data, reqId []byte) ([]byte, int) {
	buf, i, n := Post(c.InvestmentReports, conn, buf, data)
	investmentreport := ParseInvestmentReportResponse(buf[i:n])
	c.InvestmentReports[int64(investmentreport.Id)] = investmentreport
	return buf, n
}

func PutInvestmentReportVal(p interface{}, b interface{}) interface{} {
	put := p.(PutInvestmentReportRequest)
	investmentreport := b.(InvestmentReport)
	if put.Data.Body.Amount != 0 {
		investmentreport.Amount = put.Data.Body.Amount
	}
	if put.Data.Body.Loss != 0 {
		investmentreport.Loss = put.Data.Body.Loss
	}
	if put.Data.Body.Force {
		investmentreport.Force = put.Data.Body.Force
	}
	if put.Data.Body.Promise != "" {
		investmentreport.Promise = put.Data.Body.Promise
	}
	if put.Data.Body.Contract {
		investmentreport.Contract = put.Data.Body.Contract
	}
	if put.Data.Body.Method != "" {
		investmentreport.Method = put.Data.Body.Method
	}
	if put.Data.Body.Funds {
		investmentreport.Funds = put.Data.Body.Funds
	}
	if put.Data.Body.Communication {
		investmentreport.Communication = put.Data.Body.Communication
	}
	if put.Data.Body.Source != "" {
		investmentreport.Source = put.Data.Body.Source
	}
	if put.Data.Body.Documentation {
		investmentreport.Documentation = put.Data.Body.Documentation
	}
	if put.Data.Body.Description != "" {
		investmentreport.Description = put.Data.Body.Description
	}
	if put.Data.Body.ContactId != 0 {
		investmentreport.ContactId = put.Data.Body.ContactId
	}
	if put.Data.Body.Status != 0 {
		investmentreport.Status = put.Data.Body.Status
	}
	if put.Data.Body.Created != "" {
		investmentreport.Created = put.Data.Body.Created
	}
	if put.Data.Body.Updated != "" {
		investmentreport.Updated = put.Data.Body.Updated
	}
	/*
		Add logic to save changes to contact and address
	*/

	return investmentreport
}
