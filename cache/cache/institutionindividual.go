package cache

import (
	"encoding/json"
	"fmt"
	"net"
	"strconv"
)

type InstitutionIndividual struct {
	Id           int               `json:"id"`
	ReportId     int64             `json:"reportId"`
	IndividualId int64             `json:"individualId"`
	Report       InstitutionReport `json:"report"`
	Individual   Individual        `json:"individual"`
}

type InstitutionIndividualsResponse struct {
	Response   []InstitutionIndividual `json:"response"`
	IsDisposed bool                    `json:"isDisposed"`
	Id         string                  `json:"id"`
}

type InstitutionIndividualResponse struct {
	InstitutionIndividual InstitutionIndividual `json:"response"`
	IsDisposed            bool                  `json:"isDisposed"`
	Id                    string                `json:"id"`
}

type InstitutionIndividualData struct {
	Id   string                `json:"id"`
	Body InstitutionIndividual `json:"body"`
}

type PutInstitutionIndividualRequest struct {
	Pattern Pattern                   `json:"pattern"`
	Data    InstitutionIndividualData `json:"data"`
	Id      string                    `json:"id"`
}

func ParseInstitutionIndividualsResponse(msg []byte) []InstitutionIndividual {
	institutionindividual := InstitutionIndividualsResponse{}
	err := json.Unmarshal(msg, &institutionindividual)
	if err != nil {
		fmt.Println(err)
	}
	return institutionindividual.Response
}

func ParseInstitutionIndividualResponse(msg []byte) InstitutionIndividual {
	institutionindividual := InstitutionIndividualResponse{}
	err := json.Unmarshal(msg, &institutionindividual)
	if err != nil {
		fmt.Println(err)
	}
	return institutionindividual.InstitutionIndividual
}

func ParsePutInstitutionIndividualRequest(msg []byte) (interface{}, string, int) {
	institutionindividual := PutInstitutionIndividualRequest{}
	err := json.Unmarshal(msg, &institutionindividual)
	if err != nil {
		fmt.Println(err)
	}
	return institutionindividual, institutionindividual.Data.Id, institutionindividual.Data.Body.Id
}

func (c *Cache) LoadInstitutionIndividual(conn net.Conn) {
	buf := make([]byte, 8192)
	conn.Write([]byte(`92#{"pattern":{"path":"get/institution/individual"},"data":"","id":"loadinstitutionindividual"}`))
	n, err := conn.Read(buf)
	if err != nil {
		panic(fmt.Sprintf("Failed to load InstitutionIndividual table: %s", err))
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
	institutionindividuals := ParseInstitutionIndividualsResponse(msg[delimiter:])
	for _, ind := range institutionindividuals {
		c.InstitutionIndividuals[int64(ind.Id)] = ind
	}
}

func NestInstitutionIndividual(c *Cache, obj interface{}) interface{} {
	ind, ok := obj.(InstitutionIndividual)
	if !ok {
		return obj
	}
	if ind.ReportId != 0 {
		ind.Report = c.InstitutionReports[ind.ReportId]
	} else {
		ind.Report = InstitutionReport{}
	}
	if ind.IndividualId != 0 {
		ind.Individual = c.Individuals[ind.IndividualId]
	} else {
		ind.Individual = Individual{}
	}
	return ind
}

func (c *Cache) PostInstitutionIndividual(conn net.Conn, buf, data, reqId []byte) ([]byte, int) {
	buf, i, n := Post(c.InstitutionIndividuals, conn, buf, data)
	institutionindividual := ParseInstitutionIndividualResponse(buf[i:n])
	c.InstitutionIndividuals[int64(institutionindividual.Id)] = institutionindividual
	return buf, n
}

func PutInstitutionIndividualVal(p interface{}, b interface{}) interface{} {
	put := p.(PutInstitutionIndividualRequest)
	institutionindividual := b.(InstitutionIndividual)
	if put.Data.Body.ReportId != 0 {
		institutionindividual.ReportId = put.Data.Body.ReportId
	}
	if put.Data.Body.IndividualId != 0 {
		institutionindividual.IndividualId = put.Data.Body.IndividualId
	}
	/*
		Add logic to save changes to report and individual
	*/

	return institutionindividual
}
