package cache

import (
	"encoding/json"
	"fmt"
	"net"
)

type LaunderingReport struct {
	Id            int          `json:"id"`
	Amount        int          `json:"amount"`
	Source        string       `json:"source"`
	Method        string       `json:"method"`
	Processing    string       `json:"processing"`
	Location      string       `json:"location"`
	IncidentDate  string       `json:"incidentDate"`
	Approx        bool         `json:"approx"`
	Organized     string       `json:"organized"`
	Documentation bool         `json:"documentation"`
	Description   string       `json:"description"`
	ContactId     int64        `json:"contactId"`
	Status        int64        `json:"status"`
	Created       string       `json:"created"`
	Updated       string       `json:"updated"`
	Contact       Contact      `json:"contact"`
	Individuals   []Individual `json:"launderingindividual"`
	Businesses    []Business   `json:"launderingbusiness"`
}

type LaunderingReportsResponse struct {
	Response   []LaunderingReport `json:"response"`
	IsDisposed bool               `json:"isDisposed"`
	Id         string             `json:"id"`
}

type LaunderingReportResponse struct {
	LaunderingReport LaunderingReport `json:"response"`
	IsDisposed       bool             `json:"isDisposed"`
	Id               string           `json:"id"`
}

type LaunderingReportData struct {
	Id   string           `json:"id"`
	Body LaunderingReport `json:"body"`
}

type PutLaunderingReportRequest struct {
	Pattern Pattern              `json:"pattern"`
	Data    LaunderingReportData `json:"data"`
	Id      string               `json:"id"`
}

func ParseLaunderingReportsResponse(msg []byte) []LaunderingReport {
	launderingreport := LaunderingReportsResponse{}
	err := json.Unmarshal(msg, &launderingreport)
	if err != nil {
		fmt.Println(err)
	}
	return launderingreport.Response
}

func ParseLaunderingReportResponse(msg []byte) LaunderingReport {
	launderingreport := LaunderingReportResponse{}
	err := json.Unmarshal(msg, &launderingreport)
	if err != nil {
		fmt.Println(err)
	}
	return launderingreport.LaunderingReport
}

func ParsePutLaunderingReportRequest(msg []byte) (interface{}, string, int) {
	launderingreport := PutLaunderingReportRequest{}
	err := json.Unmarshal(msg, &launderingreport)
	if err != nil {
		fmt.Println(err)
	}
	return launderingreport, launderingreport.Data.Id, launderingreport.Data.Body.Id
}

func (c *Cache) LoadLaunderingReport(conn net.Conn) {
	buf := make([]byte, 16384)
	conn.Write([]byte(`83#{"pattern":{"path":"get/laundering/report"},"data":"","id":"loadlaundering/report"}`))
	n, err := conn.Read(buf)
	if err != nil {
		panic(fmt.Sprintf("Failed to load LaunderingReport table: %s", err))
	}
	msg := buf[:n]
	i := 0
	for msg[i] != '#' {
		i += 1
	}
	i += 1
	launderingreports := ParseLaunderingReportsResponse(msg[i:])
	for _, ind := range launderingreports {
		c.LaunderingReports[int64(ind.Id)] = ind
	}
}

func NestLaunderingReport(c *Cache, obj interface{}) interface{} {
	rep, ok := obj.(LaunderingReport)
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

func (c *Cache) PostLaunderingReport(conn net.Conn, buf, data, reqId []byte) ([]byte, int) {
	buf, i, n := Post(c.LaunderingReports, conn, buf, data)
	launderingreport := ParseLaunderingReportResponse(buf[i:n])
	c.LaunderingReports[int64(launderingreport.Id)] = launderingreport
	return buf, n
}

func PutLaunderingReportVal(p interface{}, b interface{}) interface{} {
	put := p.(PutLaunderingReportRequest)
	launderingreport := b.(LaunderingReport)
	if put.Data.Body.Amount != 0 {
		launderingreport.Amount = put.Data.Body.Amount
	}
	if put.Data.Body.Source != "" {
		launderingreport.Source = put.Data.Body.Source
	}
	if put.Data.Body.Method != "" {
		launderingreport.Method = put.Data.Body.Method
	}
	if put.Data.Body.Processing != "" {
		launderingreport.Processing = put.Data.Body.Processing
	}
	if put.Data.Body.Location != "" {
		launderingreport.Location = put.Data.Body.Location
	}
	if put.Data.Body.IncidentDate != "" {
		launderingreport.IncidentDate = put.Data.Body.IncidentDate
	}
	if put.Data.Body.Approx {
		launderingreport.Approx = put.Data.Body.Approx
	}
	if put.Data.Body.Organized != "" {
		launderingreport.Organized = put.Data.Body.Organized
	}
	if put.Data.Body.Documentation {
		launderingreport.Documentation = put.Data.Body.Documentation
	}
	if put.Data.Body.Description != "" {
		launderingreport.Description = put.Data.Body.Description
	}
	if put.Data.Body.ContactId != 0 {
		launderingreport.ContactId = put.Data.Body.ContactId
	}
	if put.Data.Body.Status != 0 {
		launderingreport.Status = put.Data.Body.Status
	}
	if put.Data.Body.Created != "" {
		launderingreport.Created = put.Data.Body.Created
	}
	if put.Data.Body.Updated != "" {
		launderingreport.Updated = put.Data.Body.Updated
	}
	/*
		Add logic to save changes to contact and address
	*/

	return launderingreport
}
