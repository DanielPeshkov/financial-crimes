package cache

import (
	"encoding/json"
	"fmt"
	"net"
	"strconv"
)

type MortgageReport struct {
	Id            int          `json:"id"`
	Amount        int          `json:"amount"`
	Loan          int          `json:"loan"`
	Payments      bool         `json:"payments"`
	Owner         string       `json:"owner"`
	AddressId     int          `json:"addressId"`
	Mortgage      string       `json:"mortgage"`
	Title         string       `json:"title"`
	Agent         string       `json:"agent"`
	Type          string       `json:"type"`
	Source        string       `json:"source"`
	Documentation bool         `json:"documentation"`
	Description   string       `json:"description"`
	ContactId     int64        `json:"contactId"`
	Status        int64        `json:"status"`
	Created       string       `json:"created"`
	Updated       string       `json:"updated"`
	Contact       Contact      `json:"contact"`
	Individuals   []Individual `json:"mortgageindividual"`
	Businesses    []Business   `json:"mortgagebusiness"`
}

type MortgageReportsResponse struct {
	Response   []MortgageReport `json:"response"`
	IsDisposed bool             `json:"isDisposed"`
	Id         string           `json:"id"`
}

type MortgageReportResponse struct {
	MortgageReport MortgageReport `json:"response"`
	IsDisposed     bool           `json:"isDisposed"`
	Id             string         `json:"id"`
}

type MortgageReportData struct {
	Id   string         `json:"id"`
	Body MortgageReport `json:"body"`
}

type PutMortgageReportRequest struct {
	Pattern Pattern            `json:"pattern"`
	Data    MortgageReportData `json:"data"`
	Id      string             `json:"id"`
}

func ParseMortgageReportsResponse(msg []byte) []MortgageReport {
	mortgagereport := MortgageReportsResponse{}
	err := json.Unmarshal(msg, &mortgagereport)
	if err != nil {
		fmt.Println(err)
	}
	return mortgagereport.Response
}

func ParseMortgageReportResponse(msg []byte) MortgageReport {
	mortgagereport := MortgageReportResponse{}
	err := json.Unmarshal(msg, &mortgagereport)
	if err != nil {
		fmt.Println(err)
	}
	return mortgagereport.MortgageReport
}

func ParsePutMortgageReportRequest(msg []byte) (interface{}, string, int) {
	mortgagereport := PutMortgageReportRequest{}
	err := json.Unmarshal(msg, &mortgagereport)
	if err != nil {
		fmt.Println(err)
	}
	return mortgagereport, mortgagereport.Data.Id, mortgagereport.Data.Body.Id
}

func (c *Cache) LoadMortgageReport(conn net.Conn) {
	buf := make([]byte, 8192)
	conn.Write([]byte(`79#{"pattern":{"path":"get/mortgage/report"},"data":"","id":"loadmortgage/report"}`))
	n, err := conn.Read(buf)
	if err != nil {
		panic(fmt.Sprintf("Failed to load MortgageReport table: %s", err))
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
	mortgagereports := ParseMortgageReportsResponse(msg[delimiter:])
	for _, ind := range mortgagereports {
		c.MortgageReports[int64(ind.Id)] = ind
	}
}

func NestMortgageReport(c *Cache, obj interface{}) interface{} {
	rep, ok := obj.(MortgageReport)
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

func (c *Cache) PostMortgageReport(conn net.Conn, buf, data, reqId []byte) ([]byte, int) {
	buf, i, n := Post(c.MortgageReports, conn, buf, data)
	mortgagereport := ParseMortgageReportResponse(buf[i:n])
	c.MortgageReports[int64(mortgagereport.Id)] = mortgagereport
	return buf, n
}

func PutMortgageReportVal(p interface{}, b interface{}) interface{} {
	put := p.(PutMortgageReportRequest)
	mortgagereport := b.(MortgageReport)
	if put.Data.Body.Amount != 0 {
		mortgagereport.Amount = put.Data.Body.Amount
	}
	if put.Data.Body.Loan != 0 {
		mortgagereport.Loan = put.Data.Body.Loan
	}
	if put.Data.Body.Payments {
		mortgagereport.Payments = put.Data.Body.Payments
	}
	if put.Data.Body.Owner != "" {
		mortgagereport.Owner = put.Data.Body.Owner
	}
	if put.Data.Body.AddressId != 0 {
		mortgagereport.AddressId = put.Data.Body.AddressId
	}
	if put.Data.Body.Mortgage != "" {
		mortgagereport.Mortgage = put.Data.Body.Mortgage
	}
	if put.Data.Body.Title != "" {
		mortgagereport.Title = put.Data.Body.Title
	}
	if put.Data.Body.Agent != "" {
		mortgagereport.Agent = put.Data.Body.Agent
	}
	if put.Data.Body.Type != "" {
		mortgagereport.Type = put.Data.Body.Type
	}
	if put.Data.Body.Source != "" {
		mortgagereport.Source = put.Data.Body.Source
	}
	if put.Data.Body.Documentation {
		mortgagereport.Documentation = put.Data.Body.Documentation
	}
	if put.Data.Body.Description != "" {
		mortgagereport.Description = put.Data.Body.Description
	}
	if put.Data.Body.ContactId != 0 {
		mortgagereport.ContactId = put.Data.Body.ContactId
	}
	if put.Data.Body.Status != 0 {
		mortgagereport.Status = put.Data.Body.Status
	}
	if put.Data.Body.Created != "" {
		mortgagereport.Created = put.Data.Body.Created
	}
	if put.Data.Body.Updated != "" {
		mortgagereport.Updated = put.Data.Body.Updated
	}
	/*
		Add logic to save changes to contact and address
	*/

	return mortgagereport
}
