package cache

import (
	"encoding/json"
	"fmt"
	"net"
)

type OtherReport struct {
	Id            int          `json:"id"`
	Type          string       `json:"type"`
	Source        string       `json:"source"`
	IncidentDate  string       `json:"incidentDate"`
	Approx        bool         `json:"approx"`
	Location      string       `json:"location"`
	Documentation bool         `json:"documentation"`
	Description   string       `json:"description"`
	ContactId     int64        `json:"contactId"`
	Status        int64        `json:"status"`
	Created       string       `json:"created"`
	Updated       string       `json:"updated"`
	Contact       Contact      `json:"contact"`
	Individuals   []Individual `json:"otherindividual"`
	Businesses    []Business   `json:"otherbusiness"`
}

type OtherReportsResponse struct {
	Response   []OtherReport `json:"response"`
	IsDisposed bool          `json:"isDisposed"`
	Id         string        `json:"id"`
}

type OtherReportResponse struct {
	OtherReport OtherReport `json:"response"`
	IsDisposed  bool        `json:"isDisposed"`
	Id          string      `json:"id"`
}

type OtherReportData struct {
	Id   string      `json:"id"`
	Body OtherReport `json:"body"`
}

type PutOtherReportRequest struct {
	Pattern Pattern         `json:"pattern"`
	Data    OtherReportData `json:"data"`
	Id      string          `json:"id"`
}

func ParseOtherReportsResponse(msg []byte) []OtherReport {
	otherreport := OtherReportsResponse{}
	err := json.Unmarshal(msg, &otherreport)
	if err != nil {
		fmt.Println(err)
	}
	return otherreport.Response
}

func ParseOtherReportResponse(msg []byte) OtherReport {
	otherreport := OtherReportResponse{}
	err := json.Unmarshal(msg, &otherreport)
	if err != nil {
		fmt.Println(err)
	}
	return otherreport.OtherReport
}

func ParsePutOtherReportRequest(msg []byte) (interface{}, string, int) {
	otherreport := PutOtherReportRequest{}
	err := json.Unmarshal(msg, &otherreport)
	if err != nil {
		fmt.Println(err)
	}
	return otherreport, otherreport.Data.Id, otherreport.Data.Body.Id
}

func (c *Cache) LoadOtherReport(conn net.Conn) {
	buf := make([]byte, 16384)
	conn.Write([]byte(`73#{"pattern":{"path":"get/other/report"},"data":"","id":"loadother/report"}`))
	n, err := conn.Read(buf)
	if err != nil {
		panic(fmt.Sprintf("Failed to load OtherReport table: %s", err))
	}
	msg := buf[:n]
	i := 0
	for msg[i] != '#' {
		i += 1
	}
	i += 1
	otherreports := ParseOtherReportsResponse(msg[i:])
	for _, ind := range otherreports {
		c.OtherReports[int64(ind.Id)] = ind
	}
}

func NestOtherReport(c *Cache, obj interface{}) interface{} {
	rep, ok := obj.(OtherReport)
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

func (c *Cache) PostOtherReport(conn net.Conn, buf, data, reqId []byte) ([]byte, int) {
	buf, i, n := Post(c.OtherReports, conn, buf, data)
	otherreport := ParseOtherReportResponse(buf[i:n])
	c.OtherReports[int64(otherreport.Id)] = otherreport
	return buf, n
}

func PutOtherReportVal(p interface{}, b interface{}) interface{} {
	put := p.(PutOtherReportRequest)
	otherreport := b.(OtherReport)
	if put.Data.Body.Type != "" {
		otherreport.Type = put.Data.Body.Type
	}
	if put.Data.Body.Source != "" {
		otherreport.Source = put.Data.Body.Source
	}
	if put.Data.Body.IncidentDate != "" {
		otherreport.IncidentDate = put.Data.Body.IncidentDate
	}
	if put.Data.Body.Approx {
		otherreport.Approx = put.Data.Body.Approx
	}
	if put.Data.Body.Location != "" {
		otherreport.Location = put.Data.Body.Location
	}
	if put.Data.Body.Documentation {
		otherreport.Documentation = put.Data.Body.Documentation
	}
	if put.Data.Body.Description != "" {
		otherreport.Description = put.Data.Body.Description
	}
	if put.Data.Body.ContactId != 0 {
		otherreport.ContactId = put.Data.Body.ContactId
	}
	if put.Data.Body.Status != 0 {
		otherreport.Status = put.Data.Body.Status
	}
	if put.Data.Body.Created != "" {
		otherreport.Created = put.Data.Body.Created
	}
	if put.Data.Body.Updated != "" {
		otherreport.Updated = put.Data.Body.Updated
	}
	/*
		Add logic to save changes to contact and address
	*/

	return otherreport
}
