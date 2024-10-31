package cache

import (
	"encoding/json"
	"fmt"
	"net"
)

type LaunderingBusiness struct {
	Id         int              `json:"id"`
	ReportId   int64            `json:"reportId"`
	BusinessId int64            `json:"businessId"`
	Report     LaunderingReport `json:"report"`
	Business   Business         `json:"business"`
}

type LaunderingBusinessesResponse struct {
	Response   []LaunderingBusiness `json:"response"`
	IsDisposed bool                 `json:"isDisposed"`
	Id         string               `json:"id"`
}

type LaunderingBusinessResponse struct {
	LaunderingBusiness LaunderingBusiness `json:"response"`
	IsDisposed         bool               `json:"isDisposed"`
	Id                 string             `json:"id"`
}

type LaunderingBusinessData struct {
	Id   string             `json:"id"`
	Body LaunderingBusiness `json:"body"`
}

type PutLaunderingBusinessRequest struct {
	Pattern Pattern                `json:"pattern"`
	Data    LaunderingBusinessData `json:"data"`
	Id      string                 `json:"id"`
}

func ParseLaunderingBusinessesResponse(msg []byte) []LaunderingBusiness {
	launderingbusiness := LaunderingBusinessesResponse{}
	err := json.Unmarshal(msg, &launderingbusiness)
	if err != nil {
		fmt.Println(err)
	}
	return launderingbusiness.Response
}

func ParseLaunderingBusinessResponse(msg []byte) LaunderingBusiness {
	launderingbusiness := LaunderingBusinessResponse{}
	err := json.Unmarshal(msg, &launderingbusiness)
	if err != nil {
		fmt.Println(err)
	}
	return launderingbusiness.LaunderingBusiness
}

func ParsePutLaunderingBusinessRequest(msg []byte) (interface{}, string, int) {
	launderingbusiness := PutLaunderingBusinessRequest{}
	err := json.Unmarshal(msg, &launderingbusiness)
	if err != nil {
		fmt.Println(err)
	}
	return launderingbusiness, launderingbusiness.Data.Id, launderingbusiness.Data.Body.Id
}

func (c *Cache) LoadLaunderingBusiness(conn net.Conn) {
	buf := make([]byte, 16384)
	conn.Write([]byte(`86#{"pattern":{"path":"get/laundering/business"},"data":"","id":"loadlaunderingbusiness"}`))
	n, err := conn.Read(buf)
	if err != nil {
		panic(fmt.Sprintf("Failed to load LaunderingBusiness table: %s", err))
	}
	msg := buf[:n]
	i := 0
	for msg[i] != '#' {
		i += 1
	}
	i += 1
	launderingbusinesses := ParseLaunderingBusinessesResponse(msg[i:])
	for _, ind := range launderingbusinesses {
		c.LaunderingBusinesses[int64(ind.Id)] = ind
	}
}

func NestLaunderingBusiness(c *Cache, obj interface{}) interface{} {
	ind, ok := obj.(LaunderingBusiness)
	if !ok {
		return obj
	}
	if ind.ReportId != 0 {
		ind.Report = c.LaunderingReports[ind.ReportId]
	} else {
		ind.Report = LaunderingReport{}
	}
	if ind.BusinessId != 0 {
		ind.Business = c.Businesses[ind.BusinessId]
	} else {
		ind.Business = Business{}
	}
	return ind
}

func (c *Cache) PostLaunderingBusiness(conn net.Conn, buf, data, reqId []byte) ([]byte, int) {
	buf, i, n := Post(c.LaunderingBusinesses, conn, buf, data)
	launderingbusiness := ParseLaunderingBusinessResponse(buf[i:n])
	c.LaunderingBusinesses[int64(launderingbusiness.Id)] = launderingbusiness
	return buf, n
}

func PutLaunderingBusinessVal(p interface{}, b interface{}) interface{} {
	put := p.(PutLaunderingBusinessRequest)
	launderingbusiness := b.(LaunderingBusiness)
	if put.Data.Body.ReportId != 0 {
		launderingbusiness.ReportId = put.Data.Body.ReportId
	}
	if put.Data.Body.BusinessId != 0 {
		launderingbusiness.BusinessId = put.Data.Body.BusinessId
	}
	/*
		Add logic to save changes to report and business
	*/

	return launderingbusiness
}
