package cache

import (
	"encoding/json"
	"fmt"
	"net"
)

type InstitutionBusiness struct {
	Id         int               `json:"id"`
	ReportId   int64             `json:"reportId"`
	BusinessId int64             `json:"businessId"`
	Report     InstitutionReport `json:"report"`
	Business   Business          `json:"business"`
}

type InstitutionBusinessesResponse struct {
	Response   []InstitutionBusiness `json:"response"`
	IsDisposed bool                  `json:"isDisposed"`
	Id         string                `json:"id"`
}

type InstitutionBusinessResponse struct {
	InstitutionBusiness InstitutionBusiness `json:"response"`
	IsDisposed          bool                `json:"isDisposed"`
	Id                  string              `json:"id"`
}

type InstitutionBusinessData struct {
	Id   string              `json:"id"`
	Body InstitutionBusiness `json:"body"`
}

type PutInstitutionBusinessRequest struct {
	Pattern Pattern                 `json:"pattern"`
	Data    InstitutionBusinessData `json:"data"`
	Id      string                  `json:"id"`
}

func ParseInstitutionBusinessesResponse(msg []byte) []InstitutionBusiness {
	institutionbusiness := InstitutionBusinessesResponse{}
	err := json.Unmarshal(msg, &institutionbusiness)
	if err != nil {
		fmt.Println(err)
	}
	return institutionbusiness.Response
}

func ParseInstitutionBusinessResponse(msg []byte) InstitutionBusiness {
	institutionbusiness := InstitutionBusinessResponse{}
	err := json.Unmarshal(msg, &institutionbusiness)
	if err != nil {
		fmt.Println(err)
	}
	return institutionbusiness.InstitutionBusiness
}

func ParsePutInstitutionBusinessRequest(msg []byte) (interface{}, string, int) {
	institutionbusiness := PutInstitutionBusinessRequest{}
	err := json.Unmarshal(msg, &institutionbusiness)
	if err != nil {
		fmt.Println(err)
	}
	return institutionbusiness, institutionbusiness.Data.Id, institutionbusiness.Data.Body.Id
}

func (c *Cache) LoadInstitutionBusiness(conn net.Conn) {
	buf := make([]byte, 16384)
	conn.Write([]byte(`88#{"pattern":{"path":"get/institution/business"},"data":"","id":"loadinstitutionbusiness"}`))
	n, err := conn.Read(buf)
	if err != nil {
		panic(fmt.Sprintf("Failed to load InstitutionBusiness table: %s", err))
	}
	msg := buf[:n]
	i := 0
	for msg[i] != '#' {
		i += 1
	}
	i += 1
	institutionbusinesses := ParseInstitutionBusinessesResponse(msg[i:])
	for _, ind := range institutionbusinesses {
		c.InstitutionBusinesses[int64(ind.Id)] = ind
	}
}

func NestInstitutionBusiness(c *Cache, obj interface{}) interface{} {
	ind, ok := obj.(InstitutionBusiness)
	if !ok {
		return obj
	}
	if ind.ReportId != 0 {
		ind.Report = c.InstitutionReports[ind.ReportId]
	} else {
		ind.Report = InstitutionReport{}
	}
	if ind.BusinessId != 0 {
		ind.Business = c.Businesses[ind.BusinessId]
	} else {
		ind.Business = Business{}
	}
	return ind
}

func (c *Cache) PostInstitutionBusiness(conn net.Conn, buf, data, reqId []byte) ([]byte, int) {
	buf, i, n := Post(c.InstitutionBusinesses, conn, buf, data)
	institutionbusiness := ParseInstitutionBusinessResponse(buf[i:n])
	c.InstitutionBusinesses[int64(institutionbusiness.Id)] = institutionbusiness
	return buf, n
}

func PutInstitutionBusinessVal(p interface{}, b interface{}) interface{} {
	put := p.(PutInstitutionBusinessRequest)
	institutionbusiness := b.(InstitutionBusiness)
	if put.Data.Body.ReportId != 0 {
		institutionbusiness.ReportId = put.Data.Body.ReportId
	}
	if put.Data.Body.BusinessId != 0 {
		institutionbusiness.BusinessId = put.Data.Body.BusinessId
	}
	/*
		Add logic to save changes to report and business
	*/

	return institutionbusiness
}
