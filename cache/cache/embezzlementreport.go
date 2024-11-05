package cache

import (
	"encoding/json"
	"fmt"
	"net"
	"strconv"
)

type EmbezzlementReport struct {
	Id            int          `json:"id"`
	Amount        int          `json:"amount"`
	Employee      bool         `json:"employee"`
	Type          string       `json:"type"`
	Location      string       `json:"location"`
	Source        string       `json:"source"`
	Documentation bool         `json:"documentation"`
	Description   string       `json:"description"`
	ContactId     int64        `json:"contactId"`
	Status        int64        `json:"status"`
	Created       string       `json:"created"`
	Updated       string       `json:"updated"`
	Contact       Contact      `json:"contact"`
	Individuals   []Individual `json:"embezzlementindividual"`
	Businesses    []Business   `json:"embezzlementbusiness"`
}

type EmbezzlementReportsResponse struct {
	Response   []EmbezzlementReport `json:"response"`
	IsDisposed bool                 `json:"isDisposed"`
	Id         string               `json:"id"`
}

type EmbezzlementReportResponse struct {
	EmbezzlementReport EmbezzlementReport `json:"response"`
	IsDisposed         bool               `json:"isDisposed"`
	Id                 string             `json:"id"`
}

type EmbezzlementReportData struct {
	Id   string             `json:"id"`
	Body EmbezzlementReport `json:"body"`
}

type PutEmbezzlementReportRequest struct {
	Pattern Pattern                `json:"pattern"`
	Data    EmbezzlementReportData `json:"data"`
	Id      string                 `json:"id"`
}

func ParseEmbezzlementReportsResponse(msg []byte) []EmbezzlementReport {
	embezzlementreport := EmbezzlementReportsResponse{}
	err := json.Unmarshal(msg, &embezzlementreport)
	if err != nil {
		fmt.Println(err)
	}
	return embezzlementreport.Response
}

func ParseEmbezzlementReportResponse(msg []byte) EmbezzlementReport {
	embezzlementreport := EmbezzlementReportResponse{}
	err := json.Unmarshal(msg, &embezzlementreport)
	if err != nil {
		fmt.Println(err)
	}
	return embezzlementreport.EmbezzlementReport
}

func ParsePutEmbezzlementReportRequest(msg []byte) (interface{}, string, int) {
	embezzlementreport := PutEmbezzlementReportRequest{}
	err := json.Unmarshal(msg, &embezzlementreport)
	if err != nil {
		fmt.Println(err)
	}
	return embezzlementreport, embezzlementreport.Data.Id, embezzlementreport.Data.Body.Id
}

func (c *Cache) LoadEmbezzlementReport(conn net.Conn) {
	buf := make([]byte, 8192)
	conn.Write([]byte(`87#{"pattern":{"path":"get/embezzlement/report"},"data":"","id":"loadembezzlement/report"}`))
	n, err := conn.Read(buf)
	if err != nil {
		panic(fmt.Sprintf("Failed to load EmbezzlementReport table: %s", err))
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
	embezzlementreports := ParseEmbezzlementReportsResponse(msg[delimiter:])
	for _, ind := range embezzlementreports {
		c.EmbezzlementReports[int64(ind.Id)] = ind
	}
}

func NestEmbezzlementReport(c *Cache, obj interface{}) interface{} {
	rep, ok := obj.(EmbezzlementReport)
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

func (c *Cache) PostEmbezzlementReport(conn net.Conn, buf, data, reqId []byte) ([]byte, int) {
	buf, i, n := Post(c.EmbezzlementReports, conn, buf, data)
	embezzlementreport := ParseEmbezzlementReportResponse(buf[i:n])
	c.EmbezzlementReports[int64(embezzlementreport.Id)] = embezzlementreport
	return buf, n
}

func PutEmbezzlementReportVal(p interface{}, b interface{}) interface{} {
	put := p.(PutEmbezzlementReportRequest)
	embezzlementreport := b.(EmbezzlementReport)
	if put.Data.Body.Amount != 0 {
		embezzlementreport.Amount = put.Data.Body.Amount
	}
	if put.Data.Body.Employee {
		embezzlementreport.Employee = put.Data.Body.Employee
	}
	if put.Data.Body.Type != "" {
		embezzlementreport.Type = put.Data.Body.Type
	}
	if put.Data.Body.Location != "" {
		embezzlementreport.Location = put.Data.Body.Location
	}
	if put.Data.Body.Source != "" {
		embezzlementreport.Source = put.Data.Body.Source
	}
	if put.Data.Body.Documentation {
		embezzlementreport.Documentation = put.Data.Body.Documentation
	}
	if put.Data.Body.Description != "" {
		embezzlementreport.Description = put.Data.Body.Description
	}
	if put.Data.Body.ContactId != 0 {
		embezzlementreport.ContactId = put.Data.Body.ContactId
	}
	if put.Data.Body.Status != 0 {
		embezzlementreport.Status = put.Data.Body.Status
	}
	if put.Data.Body.Created != "" {
		embezzlementreport.Created = put.Data.Body.Created
	}
	if put.Data.Body.Updated != "" {
		embezzlementreport.Updated = put.Data.Body.Updated
	}
	/*
		Add logic to save changes to contact and address
	*/

	return embezzlementreport
}
