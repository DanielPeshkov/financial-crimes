package cache

import (
	"encoding/json"
	"fmt"
	"net"
)

type EmbezzlementBusiness struct {
	Id         int                `json:"id"`
	ReportId   int64              `json:"reportId"`
	BusinessId int64              `json:"businessId"`
	Report     EmbezzlementReport `json:"report"`
	Business   Business           `json:"business"`
}

type EmbezzlementBusinessesResponse struct {
	Response   []EmbezzlementBusiness `json:"response"`
	IsDisposed bool                   `json:"isDisposed"`
	Id         string                 `json:"id"`
}

type EmbezzlementBusinessResponse struct {
	EmbezzlementBusiness EmbezzlementBusiness `json:"response"`
	IsDisposed           bool                 `json:"isDisposed"`
	Id                   string               `json:"id"`
}

type EmbezzlementBusinessData struct {
	Id   string               `json:"id"`
	Body EmbezzlementBusiness `json:"body"`
}

type PutEmbezzlementBusinessRequest struct {
	Pattern Pattern                  `json:"pattern"`
	Data    EmbezzlementBusinessData `json:"data"`
	Id      string                   `json:"id"`
}

func ParseEmbezzlementBusinessesResponse(msg []byte) []EmbezzlementBusiness {
	embezzlementbusiness := EmbezzlementBusinessesResponse{}
	err := json.Unmarshal(msg, &embezzlementbusiness)
	if err != nil {
		fmt.Println(err)
	}
	return embezzlementbusiness.Response
}

func ParseEmbezzlementBusinessResponse(msg []byte) EmbezzlementBusiness {
	embezzlementbusiness := EmbezzlementBusinessResponse{}
	err := json.Unmarshal(msg, &embezzlementbusiness)
	if err != nil {
		fmt.Println(err)
	}
	return embezzlementbusiness.EmbezzlementBusiness
}

func ParsePutEmbezzlementBusinessRequest(msg []byte) (interface{}, string, int) {
	embezzlementbusiness := PutEmbezzlementBusinessRequest{}
	err := json.Unmarshal(msg, &embezzlementbusiness)
	if err != nil {
		fmt.Println(err)
	}
	return embezzlementbusiness, embezzlementbusiness.Data.Id, embezzlementbusiness.Data.Body.Id
}

func (c *Cache) LoadEmbezzlementBusiness(conn net.Conn) {
	buf := make([]byte, 16384)
	conn.Write([]byte(`92#{"pattern":{"path":"get/embezzlement/business"},"data":"","id":"loadembezzlementbusiness"}`))
	n, err := conn.Read(buf)
	if err != nil {
		panic(fmt.Sprintf("Failed to load EmbezzlementBusiness table: %s", err))
	}
	msg := buf[:n]
	i := 0
	for msg[i] != '#' {
		i += 1
	}
	i += 1
	embezzlementbusinesses := ParseEmbezzlementBusinessesResponse(msg[i:])
	for _, ind := range embezzlementbusinesses {
		c.EmbezzlementBusinesses[int64(ind.Id)] = ind
	}
}

func NestEmbezzlementBusiness(c *Cache, obj interface{}) interface{} {
	ind, ok := obj.(EmbezzlementBusiness)
	if !ok {
		return obj
	}
	if ind.ReportId != 0 {
		ind.Report = c.EmbezzlementReports[ind.ReportId]
	} else {
		ind.Report = EmbezzlementReport{}
	}
	if ind.BusinessId != 0 {
		ind.Business = c.Businesses[ind.BusinessId]
	} else {
		ind.Business = Business{}
	}
	return ind
}

func (c *Cache) PostEmbezzlementBusiness(conn net.Conn, buf, data, reqId []byte) ([]byte, int) {
	buf, i, n := Post(c.EmbezzlementBusinesses, conn, buf, data)
	embezzlementbusiness := ParseEmbezzlementBusinessResponse(buf[i:n])
	c.EmbezzlementBusinesses[int64(embezzlementbusiness.Id)] = embezzlementbusiness
	return buf, n
}

func PutEmbezzlementBusinessVal(p interface{}, b interface{}) interface{} {
	put := p.(PutEmbezzlementBusinessRequest)
	embezzlementbusiness := b.(EmbezzlementBusiness)
	if put.Data.Body.ReportId != 0 {
		embezzlementbusiness.ReportId = put.Data.Body.ReportId
	}
	if put.Data.Body.BusinessId != 0 {
		embezzlementbusiness.BusinessId = put.Data.Body.BusinessId
	}
	/*
		Add logic to save changes to report and business
	*/

	return embezzlementbusiness
}
