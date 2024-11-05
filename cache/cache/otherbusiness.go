package cache

import (
	"encoding/json"
	"fmt"
	"net"
	"strconv"
)

type OtherBusiness struct {
	Id         int         `json:"id"`
	ReportId   int64       `json:"reportId"`
	BusinessId int64       `json:"businessId"`
	Report     OtherReport `json:"report"`
	Business   Business    `json:"business"`
}

type OtherBusinessesResponse struct {
	Response   []OtherBusiness `json:"response"`
	IsDisposed bool            `json:"isDisposed"`
	Id         string          `json:"id"`
}

type OtherBusinessResponse struct {
	OtherBusiness OtherBusiness `json:"response"`
	IsDisposed    bool          `json:"isDisposed"`
	Id            string        `json:"id"`
}

type OtherBusinessData struct {
	Id   string        `json:"id"`
	Body OtherBusiness `json:"body"`
}

type PutOtherBusinessRequest struct {
	Pattern Pattern           `json:"pattern"`
	Data    OtherBusinessData `json:"data"`
	Id      string            `json:"id"`
}

func ParseOtherBusinessesResponse(msg []byte) []OtherBusiness {
	otherbusiness := OtherBusinessesResponse{}
	err := json.Unmarshal(msg, &otherbusiness)
	if err != nil {
		fmt.Println(err)
	}
	return otherbusiness.Response
}

func ParseOtherBusinessResponse(msg []byte) OtherBusiness {
	otherbusiness := OtherBusinessResponse{}
	err := json.Unmarshal(msg, &otherbusiness)
	if err != nil {
		fmt.Println(err)
	}
	return otherbusiness.OtherBusiness
}

func ParsePutOtherBusinessRequest(msg []byte) (interface{}, string, int) {
	otherbusiness := PutOtherBusinessRequest{}
	err := json.Unmarshal(msg, &otherbusiness)
	if err != nil {
		fmt.Println(err)
	}
	return otherbusiness, otherbusiness.Data.Id, otherbusiness.Data.Body.Id
}

func (c *Cache) LoadOtherBusiness(conn net.Conn) {
	buf := make([]byte, 8192)
	conn.Write([]byte(`76#{"pattern":{"path":"get/other/business"},"data":"","id":"loadotherbusiness"}`))
	n, err := conn.Read(buf)
	if err != nil {
		panic(fmt.Sprintf("Failed to load OtherBusiness table: %s", err))
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
	otherbusinesses := ParseOtherBusinessesResponse(msg[delimiter:])
	for _, ind := range otherbusinesses {
		c.OtherBusinesses[int64(ind.Id)] = ind
	}
}

func NestOtherBusiness(c *Cache, obj interface{}) interface{} {
	ind, ok := obj.(OtherBusiness)
	if !ok {
		return obj
	}
	if ind.ReportId != 0 {
		ind.Report = c.OtherReports[ind.ReportId]
	} else {
		ind.Report = OtherReport{}
	}
	if ind.BusinessId != 0 {
		ind.Business = c.Businesses[ind.BusinessId]
	} else {
		ind.Business = Business{}
	}
	return ind
}

func (c *Cache) PostOtherBusiness(conn net.Conn, buf, data, reqId []byte) ([]byte, int) {
	buf, i, n := Post(c.OtherBusinesses, conn, buf, data)
	otherbusiness := ParseOtherBusinessResponse(buf[i:n])
	c.OtherBusinesses[int64(otherbusiness.Id)] = otherbusiness
	return buf, n
}

func PutOtherBusinessVal(p interface{}, b interface{}) interface{} {
	put := p.(PutOtherBusinessRequest)
	otherbusiness := b.(OtherBusiness)
	if put.Data.Body.ReportId != 0 {
		otherbusiness.ReportId = put.Data.Body.ReportId
	}
	if put.Data.Body.BusinessId != 0 {
		otherbusiness.BusinessId = put.Data.Body.BusinessId
	}
	/*
		Add logic to save changes to report and business
	*/

	return otherbusiness
}
