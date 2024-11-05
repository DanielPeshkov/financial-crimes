package cache

import (
	"encoding/json"
	"fmt"
	"net"
	"strconv"
)

type InvestmentBusiness struct {
	Id         int              `json:"id"`
	ReportId   int64            `json:"reportId"`
	BusinessId int64            `json:"businessId"`
	Report     InvestmentReport `json:"report"`
	Business   Business         `json:"business"`
}

type InvestmentBusinessesResponse struct {
	Response   []InvestmentBusiness `json:"response"`
	IsDisposed bool                 `json:"isDisposed"`
	Id         string               `json:"id"`
}

type InvestmentBusinessResponse struct {
	InvestmentBusiness InvestmentBusiness `json:"response"`
	IsDisposed         bool               `json:"isDisposed"`
	Id                 string             `json:"id"`
}

type InvestmentBusinessData struct {
	Id   string             `json:"id"`
	Body InvestmentBusiness `json:"body"`
}

type PutInvestmentBusinessRequest struct {
	Pattern Pattern                `json:"pattern"`
	Data    InvestmentBusinessData `json:"data"`
	Id      string                 `json:"id"`
}

func ParseInvestmentBusinessesResponse(msg []byte) []InvestmentBusiness {
	investmentbusiness := InvestmentBusinessesResponse{}
	err := json.Unmarshal(msg, &investmentbusiness)
	if err != nil {
		fmt.Println(err)
	}
	return investmentbusiness.Response
}

func ParseInvestmentBusinessResponse(msg []byte) InvestmentBusiness {
	investmentbusiness := InvestmentBusinessResponse{}
	err := json.Unmarshal(msg, &investmentbusiness)
	if err != nil {
		fmt.Println(err)
	}
	return investmentbusiness.InvestmentBusiness
}

func ParsePutInvestmentBusinessRequest(msg []byte) (interface{}, string, int) {
	investmentbusiness := PutInvestmentBusinessRequest{}
	err := json.Unmarshal(msg, &investmentbusiness)
	if err != nil {
		fmt.Println(err)
	}
	return investmentbusiness, investmentbusiness.Data.Id, investmentbusiness.Data.Body.Id
}

func (c *Cache) LoadInvestmentBusiness(conn net.Conn) {
	buf := make([]byte, 8192)
	conn.Write([]byte(`86#{"pattern":{"path":"get/investment/business"},"data":"","id":"loadinvestmentbusiness"}`))
	n, err := conn.Read(buf)
	if err != nil {
		panic(fmt.Sprintf("Failed to load InvestmentBusiness table: %s", err))
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
	investmentbusinesses := ParseInvestmentBusinessesResponse(msg[delimiter:])
	for _, ind := range investmentbusinesses {
		c.InvestmentBusinesses[int64(ind.Id)] = ind
	}
}

func NestInvestmentBusiness(c *Cache, obj interface{}) interface{} {
	ind, ok := obj.(InvestmentBusiness)
	if !ok {
		return obj
	}
	if ind.ReportId != 0 {
		ind.Report = c.InvestmentReports[ind.ReportId]
	} else {
		ind.Report = InvestmentReport{}
	}
	if ind.BusinessId != 0 {
		ind.Business = c.Businesses[ind.BusinessId]
	} else {
		ind.Business = Business{}
	}
	return ind
}

func (c *Cache) PostInvestmentBusiness(conn net.Conn, buf, data, reqId []byte) ([]byte, int) {
	buf, i, n := Post(c.InvestmentBusinesses, conn, buf, data)
	investmentbusiness := ParseInvestmentBusinessResponse(buf[i:n])
	c.InvestmentBusinesses[int64(investmentbusiness.Id)] = investmentbusiness
	return buf, n
}

func PutInvestmentBusinessVal(p interface{}, b interface{}) interface{} {
	put := p.(PutInvestmentBusinessRequest)
	investmentbusiness := b.(InvestmentBusiness)
	if put.Data.Body.ReportId != 0 {
		investmentbusiness.ReportId = put.Data.Body.ReportId
	}
	if put.Data.Body.BusinessId != 0 {
		investmentbusiness.BusinessId = put.Data.Body.BusinessId
	}
	/*
		Add logic to save changes to report and business
	*/

	return investmentbusiness
}
