package cache

import (
	"encoding/json"
	"fmt"
	"net"
	"strconv"
)

type Address struct {
	Id      int    `json:"id"`
	Type    string `json:"type"`
	Street  string `json:"street"`
	Street2 string `json:"street2"`
	City    string `json:"city"`
	State   string `json:"state"`
	Zip     string `json:"zip"`
	Country string `json:"country"`
}

type AddresssResponse struct {
	Response   []Address `json:"response"`
	IsDisposed bool      `json:"isDisposed"`
	Id         string    `json:"id"`
}

type AddressResponse struct {
	Address    Address `json:"response"`
	IsDisposed bool    `json:"isDisposed"`
	Id         string  `json:"id"`
}

type AddressData struct {
	Id   string  `json:"id"`
	Body Address `json:"body"`
}

type PutAddressRequest struct {
	Pattern Pattern     `json:"pattern"`
	Data    AddressData `json:"data"`
	Id      string      `json:"id"`
}

func ParseAddressesResponse(msg []byte) []Address {
	address := AddresssResponse{}
	err := json.Unmarshal(msg, &address)
	if err != nil {
		fmt.Println(err)
	}
	return address.Response
}

func ParseAddressResponse(msg []byte) Address {
	address := AddressResponse{}
	err := json.Unmarshal(msg, &address)
	if err != nil {
		fmt.Println(err)
	}
	return address.Address
}

func ParsePutAddressRequest(msg []byte) (interface{}, string, int) {
	address := PutAddressRequest{}
	err := json.Unmarshal(msg, &address)
	if err != nil {
		fmt.Println(err)
	}
	return address, address.Data.Id, address.Data.Body.Id
}

func (c *Cache) LoadAddress(conn net.Conn) {
	buf := make([]byte, 8192)
	conn.Write([]byte(`63#{"pattern":{"path":"get/address"},"data":"","id":"loadaddress"}`))
	n, err := conn.Read(buf)
	if err != nil {
		panic(fmt.Sprintf("Failed to load Address table: %s", err))
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
	addresses := ParseAddressesResponse(msg[delimiter:])
	for _, ad := range addresses {
		c.Addresses[int64(ad.Id)] = ad
	}
}

func (c *Cache) PostAddress(conn net.Conn, buf, data, reqId []byte) ([]byte, int) {
	buf, i, n := Post(c.Addresses, conn, buf, data)
	address := ParseAddressResponse(buf[i:n])
	c.Addresses[int64(address.Id)] = address
	return buf, n
}

func PutAddressVal(p interface{}, a interface{}) interface{} {
	put := p.(PutAddressRequest)
	address := a.(Address)
	if put.Data.Body.Type != "" {
		address.Type = put.Data.Body.Type
	}
	if put.Data.Body.Street != "" {
		address.Street = put.Data.Body.Street
	}
	if put.Data.Body.Street2 != "" {
		address.Street2 = put.Data.Body.Street2
	}
	if put.Data.Body.City != "" {
		address.City = put.Data.Body.City
	}
	if put.Data.Body.State != "" {
		address.State = put.Data.Body.State
	}
	if put.Data.Body.Zip != "" {
		if len(put.Data.Body.Zip) == 5 {
			address.Zip = put.Data.Body.Zip
		}
	}
	if put.Data.Body.Country != "" {
		address.Country = put.Data.Body.Country
	}
	return address
}
