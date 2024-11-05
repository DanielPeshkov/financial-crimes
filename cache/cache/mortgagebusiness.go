package cache

import (
	"encoding/json"
	"fmt"
	"net"
	"strconv"
)

type MortgageBusiness struct {
	Id         int            `json:"id"`
	ReportId   int64          `json:"reportId"`
	BusinessId int64          `json:"businessId"`
	Report     MortgageReport `json:"report"`
	Business   Business       `json:"business"`
}

type MortgageBusinessesResponse struct {
	Response   []MortgageBusiness `json:"response"`
	IsDisposed bool               `json:"isDisposed"`
	Id         string             `json:"id"`
}

type MortgageBusinessResponse struct {
	MortgageBusiness MortgageBusiness `json:"response"`
	IsDisposed       bool             `json:"isDisposed"`
	Id               string           `json:"id"`
}

type MortgageBusinessData struct {
	Id   string           `json:"id"`
	Body MortgageBusiness `json:"body"`
}

type PutMortgageBusinessRequest struct {
	Pattern Pattern              `json:"pattern"`
	Data    MortgageBusinessData `json:"data"`
	Id      string               `json:"id"`
}

func ParseMortgageBusinessesResponse(msg []byte) []MortgageBusiness {
	mortgagebusiness := MortgageBusinessesResponse{}
	err := json.Unmarshal(msg, &mortgagebusiness)
	if err != nil {
		fmt.Println(err)
	}
	return mortgagebusiness.Response
}

func ParseMortgageBusinessResponse(msg []byte) MortgageBusiness {
	mortgagebusiness := MortgageBusinessResponse{}
	err := json.Unmarshal(msg, &mortgagebusiness)
	if err != nil {
		fmt.Println(err)
	}
	return mortgagebusiness.MortgageBusiness
}

func ParsePutMortgageBusinessRequest(msg []byte) (interface{}, string, int) {
	mortgagebusiness := PutMortgageBusinessRequest{}
	err := json.Unmarshal(msg, &mortgagebusiness)
	if err != nil {
		fmt.Println(err)
	}
	return mortgagebusiness, mortgagebusiness.Data.Id, mortgagebusiness.Data.Body.Id
}

func (c *Cache) LoadMortgageBusiness(conn net.Conn) {
	buf := make([]byte, 8192)
	conn.Write([]byte(`82#{"pattern":{"path":"get/mortgage/business"},"data":"","id":"loadmortgagebusiness"}`))
	n, err := conn.Read(buf)
	if err != nil {
		panic(fmt.Sprintf("Failed to load MortgageBusiness table: %s", err))
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
	mortgagebusinesses := ParseMortgageBusinessesResponse(msg[delimiter:])
	for _, ind := range mortgagebusinesses {
		c.MortgageBusinesses[int64(ind.Id)] = ind
	}
}

func NestMortgageBusiness(c *Cache, obj interface{}) interface{} {
	ind, ok := obj.(MortgageBusiness)
	if !ok {
		return obj
	}
	if ind.ReportId != 0 {
		ind.Report = c.MortgageReports[ind.ReportId]
	} else {
		ind.Report = MortgageReport{}
	}
	if ind.BusinessId != 0 {
		ind.Business = c.Businesses[ind.BusinessId]
	} else {
		ind.Business = Business{}
	}
	return ind
}

func (c *Cache) PostMortgageBusiness(conn net.Conn, buf, data, reqId []byte) ([]byte, int) {
	buf, i, n := Post(c.MortgageBusinesses, conn, buf, data)
	mortgagebusiness := ParseMortgageBusinessResponse(buf[i:n])
	c.MortgageBusinesses[int64(mortgagebusiness.Id)] = mortgagebusiness
	return buf, n
}

func PutMortgageBusinessVal(p interface{}, b interface{}) interface{} {
	put := p.(PutMortgageBusinessRequest)
	mortgagebusiness := b.(MortgageBusiness)
	if put.Data.Body.ReportId != 0 {
		mortgagebusiness.ReportId = put.Data.Body.ReportId
	}
	if put.Data.Body.BusinessId != 0 {
		mortgagebusiness.BusinessId = put.Data.Body.BusinessId
	}
	/*
		Add logic to save changes to report and business
	*/

	return mortgagebusiness
}
