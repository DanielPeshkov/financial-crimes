package cache

import (
	"encoding/json"
	"fmt"
	"net"
	"strconv"
)

type Individual struct {
	Id         int     `json:"id"`
	FirstName  string  `json:"firstName"`
	MiddleName string  `json:"middleName"`
	LastName   string  `json:"lastName"`
	Birth      string  `json:"birth"`
	Approx     bool    `json:"approx"`
	Age        int64   `json:"age"`
	ContactId  int64   `json:"contactId"`
	AddressId  int64   `json:"addressId"`
	Contact    Contact `json:"contact"`
	Address    Address `json:"address"`
}

type IndividualsResponse struct {
	Response   []Individual `json:"response"`
	IsDisposed bool         `json:"isDisposed"`
	Id         string       `json:"id"`
}

type IndividualResponse struct {
	Individual Individual `json:"response"`
	IsDisposed bool       `json:"isDisposed"`
	Id         string     `json:"id"`
}

type IndividualData struct {
	Id   string     `json:"id"`
	Body Individual `json:"body"`
}

type PutIndividualRequest struct {
	Pattern Pattern        `json:"pattern"`
	Data    IndividualData `json:"data"`
	Id      string         `json:"id"`
}

func ParseIndividualsResponse(msg []byte) []Individual {
	individual := IndividualsResponse{}
	err := json.Unmarshal(msg, &individual)
	if err != nil {
		fmt.Println(err)
	}
	return individual.Response
}

func ParseIndividualResponse(msg []byte) Individual {
	individual := IndividualResponse{}
	err := json.Unmarshal(msg, &individual)
	if err != nil {
		fmt.Println(err)
	}
	return individual.Individual
}

func ParsePutIndividualRequest(msg []byte) (interface{}, string, int) {
	individual := PutIndividualRequest{}
	err := json.Unmarshal(msg, &individual)
	if err != nil {
		fmt.Println(err)
	}
	return individual, individual.Data.Id, individual.Data.Body.Id
}

func (c *Cache) LoadIndividual(conn net.Conn) {
	buf := make([]byte, 8192)
	conn.Write([]byte(`69#{"pattern":{"path":"get/individual"},"data":"","id":"loadindividual"}`))
	n, err := conn.Read(buf)
	if err != nil {
		panic(fmt.Sprintf("Failed to load Individual table: %s", err))
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
	individuals := ParseIndividualsResponse(msg[delimiter:])
	for _, ind := range individuals {
		c.Individuals[int64(ind.Id)] = ind
	}
}

func NestIndividual(c *Cache, obj interface{}) interface{} {
	ind, ok := obj.(Individual)
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

func (c *Cache) PostIndividual(conn net.Conn, buf, data, reqId []byte) ([]byte, int) {
	buf, i, n := Post(c.Individuals, conn, buf, data)
	individual := ParseIndividualResponse(buf[i:n])
	c.Individuals[int64(individual.Id)] = individual
	return buf, n
}

func PutIndividualVal(p interface{}, i interface{}) interface{} {
	put := p.(PutIndividualRequest)
	individual := i.(Individual)
	if put.Data.Body.FirstName != "" {
		individual.FirstName = put.Data.Body.FirstName
	}
	if put.Data.Body.MiddleName != "" {
		individual.MiddleName = put.Data.Body.MiddleName
	}
	if put.Data.Body.LastName != "" {
		individual.LastName = put.Data.Body.LastName
	}
	if put.Data.Body.Birth != "" {
		individual.Birth = put.Data.Body.Birth
	}
	individual.Approx = put.Data.Body.Approx
	if put.Data.Body.Age != 0 {
		individual.Age = put.Data.Body.Age
	}
	if put.Data.Body.ContactId != 0 {
		individual.ContactId = put.Data.Body.ContactId
	}
	if put.Data.Body.AddressId != 0 {
		individual.AddressId = put.Data.Body.AddressId
	}
	/*
		Add logic to save changes to contact and address
	*/

	return individual
}
