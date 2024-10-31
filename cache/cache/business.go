package cache

import (
	"encoding/json"
	"fmt"
	"net"
)

type Business struct {
	Id        int     `json:"id"`
	Name      string  `json:"name"`
	ContactId int64   `json:"contactId"`
	AddressId int64   `json:"addressId"`
	Contact   Contact `json:"contact"`
	Address   Address `json:"address"`
}

type BusinessesResponse struct {
	Response   []Business `json:"response"`
	IsDisposed bool       `json:"isDisposed"`
	Id         string     `json:"id"`
}

type BusinessResponse struct {
	Business   Business `json:"response"`
	IsDisposed bool     `json:"isDisposed"`
	Id         string   `json:"id"`
}

type BusinessData struct {
	Id   string   `json:"id"`
	Body Business `json:"body"`
}

type PutBusinessRequest struct {
	Pattern Pattern      `json:"pattern"`
	Data    BusinessData `json:"data"`
	Id      string       `json:"id"`
}

func ParseBusinessesResponse(msg []byte) []Business {
	business := BusinessesResponse{}
	err := json.Unmarshal(msg, &business)
	if err != nil {
		fmt.Println(err)
	}
	return business.Response
}

func ParseBusinessResponse(msg []byte) Business {
	business := BusinessResponse{}
	err := json.Unmarshal(msg, &business)
	if err != nil {
		fmt.Println(err)
	}
	return business.Business
}

func ParsePutBusinessRequest(msg []byte) (interface{}, string, int) {
	business := PutBusinessRequest{}
	err := json.Unmarshal(msg, &business)
	if err != nil {
		fmt.Println(err)
	}
	return business, business.Data.Id, business.Data.Body.Id
}

func (c *Cache) LoadBusiness(conn net.Conn) {
	buf := make([]byte, 16384)
	conn.Write([]byte(`65#{"pattern":{"path":"get/business"},"data":"","id":"loadbusiness"}`))
	n, err := conn.Read(buf)
	if err != nil {
		panic(fmt.Sprintf("Failed to load Business table: %s", err))
	}
	msg := buf[:n]
	i := 0
	for msg[i] != '#' {
		i += 1
	}
	i += 1
	businesses := ParseBusinessesResponse(msg[i:])
	for _, ind := range businesses {
		c.Businesses[int64(ind.Id)] = ind
	}
}

func NestBusiness(c *Cache, obj interface{}) interface{} {
	ind, ok := obj.(Business)
	if !ok {
		return obj
	}
	if ind.ContactId != 0 {
		ind.Contact = c.Contacts[ind.ContactId]
	} else {
		ind.Contact = Contact{}
	}
	if ind.AddressId != 0 {
		ind.Address = c.Addresses[ind.AddressId]
	} else {
		ind.Address = Address{}
	}
	return ind
}

func (c *Cache) PostBusiness(conn net.Conn, buf, data, reqId []byte) ([]byte, int) {
	buf, i, n := Post(c.Businesses, conn, buf, data)
	business := ParseBusinessResponse(buf[i:n])
	c.Businesses[int64(business.Id)] = business
	return buf, n
}

func PutBusinessVal(p interface{}, b interface{}) interface{} {
	put := p.(PutBusinessRequest)
	business := b.(Business)
	if put.Data.Body.Name != "" {
		business.Name = put.Data.Body.Name
	}
	if put.Data.Body.ContactId != 0 {
		business.ContactId = put.Data.Body.ContactId
	}
	if put.Data.Body.AddressId != 0 {
		business.AddressId = put.Data.Body.AddressId
	}
	/*
		Add logic to save changes to contact and address
	*/

	return business
}
