package cache

import (
	"encoding/json"
	"fmt"
	"net"
	"strconv"
)

type InstitutionReport struct {
	Id            int          `json:"id"`
	Institution   string       `json:"institution"`
	IncidentDate  string       `json:"incidentDate"`
	Approx        bool         `json:"approx"`
	Method        string       `json:"method"`
	Employee      bool         `json:"employee"`
	Source        string       `json:"source"`
	Documentation bool         `json:"documentation"`
	Description   string       `json:"description"`
	ContactId     int64        `json:"contactId"`
	Status        int64        `json:"status"`
	Created       string       `json:"created"`
	Updated       string       `json:"updated"`
	Contact       Contact      `json:"contact"`
	Individuals   []Individual `json:"institutionindividual"`
	Businesses    []Business   `json:"institutionbusiness"`
}

type InstitutionReportsResponse struct {
	Response   []InstitutionReport `json:"response"`
	IsDisposed bool                `json:"isDisposed"`
	Id         string              `json:"id"`
}

type InstitutionReportResponse struct {
	InstitutionReport InstitutionReport `json:"response"`
	IsDisposed        bool              `json:"isDisposed"`
	Id                string            `json:"id"`
}

type InstitutionReportData struct {
	Id   string            `json:"id"`
	Body InstitutionReport `json:"body"`
}

type PutInstitutionReportRequest struct {
	Pattern Pattern               `json:"pattern"`
	Data    InstitutionReportData `json:"data"`
	Id      string                `json:"id"`
}

func ParseInstitutionReportsResponse(msg []byte) []InstitutionReport {
	institutionreport := InstitutionReportsResponse{}
	err := json.Unmarshal(msg, &institutionreport)
	if err != nil {
		fmt.Println(err)
	}
	return institutionreport.Response
}

func ParseInstitutionReportResponse(msg []byte) InstitutionReport {
	institutionreport := InstitutionReportResponse{}
	err := json.Unmarshal(msg, &institutionreport)
	if err != nil {
		fmt.Println(err)
	}
	return institutionreport.InstitutionReport
}

func ParsePutInstitutionReportRequest(msg []byte) (interface{}, string, int) {
	institutionreport := PutInstitutionReportRequest{}
	err := json.Unmarshal(msg, &institutionreport)
	if err != nil {
		fmt.Println(err)
	}
	return institutionreport, institutionreport.Data.Id, institutionreport.Data.Body.Id
}

func (c *Cache) LoadInstitutionReport(conn net.Conn) {
	buf := make([]byte, 8192)
	conn.Write([]byte(`85#{"pattern":{"path":"get/institution/report"},"data":"","id":"loadinstitution/report"}`))
	n, err := conn.Read(buf)
	if err != nil {
		panic(fmt.Sprintf("Failed to load InstitutionReport table: %s", err))
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
	institutionreports := ParseInstitutionReportsResponse(msg[delimiter:])
	for _, ind := range institutionreports {
		c.InstitutionReports[int64(ind.Id)] = ind
	}
}

func NestInstitutionReport(c *Cache, obj interface{}) interface{} {
	rep, ok := obj.(InstitutionReport)
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

func (c *Cache) PostInstitutionReport(conn net.Conn, buf, data, reqId []byte) ([]byte, int) {
	buf, i, n := Post(c.InstitutionReports, conn, buf, data)
	institutionreport := ParseInstitutionReportResponse(buf[i:n])
	c.InstitutionReports[int64(institutionreport.Id)] = institutionreport
	return buf, n
}

func PutInstitutionReportVal(p interface{}, b interface{}) interface{} {
	put := p.(PutInstitutionReportRequest)
	institutionreport := b.(InstitutionReport)
	if put.Data.Body.Institution != "" {
		institutionreport.Institution = put.Data.Body.Institution
	}
	if put.Data.Body.IncidentDate != "" {
		institutionreport.IncidentDate = put.Data.Body.IncidentDate
	}
	if put.Data.Body.Approx {
		institutionreport.Approx = put.Data.Body.Approx
	}
	if put.Data.Body.Method != "" {
		institutionreport.Method = put.Data.Body.Method
	}
	if put.Data.Body.Employee {
		institutionreport.Employee = put.Data.Body.Employee
	}
	if put.Data.Body.Source != "" {
		institutionreport.Source = put.Data.Body.Source
	}
	if put.Data.Body.Documentation {
		institutionreport.Documentation = put.Data.Body.Documentation
	}
	if put.Data.Body.Description != "" {
		institutionreport.Description = put.Data.Body.Description
	}
	if put.Data.Body.ContactId != 0 {
		institutionreport.ContactId = put.Data.Body.ContactId
	}
	if put.Data.Body.Status != 0 {
		institutionreport.Status = put.Data.Body.Status
	}
	if put.Data.Body.Created != "" {
		institutionreport.Created = put.Data.Body.Created
	}
	if put.Data.Body.Updated != "" {
		institutionreport.Updated = put.Data.Body.Updated
	}
	/*
		Add logic to save changes to contact and address
	*/

	return institutionreport
}
