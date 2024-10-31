package cache

import (
	"encoding/json"
	"fmt"
	"net"
)

type EmbezzlementIndividual struct {
	Id           int                `json:"id"`
	ReportId     int64              `json:"reportId"`
	IndividualId int64              `json:"individualId"`
	Report       EmbezzlementReport `json:"report"`
	Individual   Individual         `json:"individual"`
}

type EmbezzlementIndividualsResponse struct {
	Response   []EmbezzlementIndividual `json:"response"`
	IsDisposed bool                     `json:"isDisposed"`
	Id         string                   `json:"id"`
}

type EmbezzlementIndividualResponse struct {
	EmbezzlementIndividual EmbezzlementIndividual `json:"response"`
	IsDisposed             bool                   `json:"isDisposed"`
	Id                     string                 `json:"id"`
}

type EmbezzlementIndividualData struct {
	Id   string                 `json:"id"`
	Body EmbezzlementIndividual `json:"body"`
}

type PutEmbezzlementIndividualRequest struct {
	Pattern Pattern                    `json:"pattern"`
	Data    EmbezzlementIndividualData `json:"data"`
	Id      string                     `json:"id"`
}

func ParseEmbezzlementIndividualsResponse(msg []byte) []EmbezzlementIndividual {
	embezzlementindividual := EmbezzlementIndividualsResponse{}
	err := json.Unmarshal(msg, &embezzlementindividual)
	if err != nil {
		fmt.Println(err)
	}
	return embezzlementindividual.Response
}

func ParseEmbezzlementIndividualResponse(msg []byte) EmbezzlementIndividual {
	embezzlementindividual := EmbezzlementIndividualResponse{}
	err := json.Unmarshal(msg, &embezzlementindividual)
	if err != nil {
		fmt.Println(err)
	}
	return embezzlementindividual.EmbezzlementIndividual
}

func ParsePutEmbezzlementIndividualRequest(msg []byte) (interface{}, string, int) {
	embezzlementindividual := PutEmbezzlementIndividualRequest{}
	err := json.Unmarshal(msg, &embezzlementindividual)
	if err != nil {
		fmt.Println(err)
	}
	return embezzlementindividual, embezzlementindividual.Data.Id, embezzlementindividual.Data.Body.Id
}

func (c *Cache) LoadEmbezzlementIndividual(conn net.Conn) {
	buf := make([]byte, 16384)
	conn.Write([]byte(`96#{"pattern":{"path":"get/embezzlement/individual"},"data":"","id":"loadembezzlementindividual"}`))
	n, err := conn.Read(buf)
	if err != nil {
		panic(fmt.Sprintf("Failed to load EmbezzlementIndividual table: %s", err))
	}
	msg := buf[:n]
	i := 0
	for msg[i] != '#' {
		i += 1
	}
	i += 1
	embezzlementindividuals := ParseEmbezzlementIndividualsResponse(msg[i:])
	for _, ind := range embezzlementindividuals {
		c.EmbezzlementIndividuals[int64(ind.Id)] = ind
	}
}

func NestEmbezzlementIndividual(c *Cache, obj interface{}) interface{} {
	ind, ok := obj.(EmbezzlementIndividual)
	if !ok {
		return obj
	}
	if ind.ReportId != 0 {
		ind.Report = c.EmbezzlementReports[ind.ReportId]
	} else {
		ind.Report = EmbezzlementReport{}
	}
	if ind.IndividualId != 0 {
		ind.Individual = c.Individuals[ind.IndividualId]
	} else {
		ind.Individual = Individual{}
	}
	return ind
}

func (c *Cache) PostEmbezzlementIndividual(conn net.Conn, buf, data, reqId []byte) ([]byte, int) {
	buf, i, n := Post(c.EmbezzlementIndividuals, conn, buf, data)
	embezzlementindividual := ParseEmbezzlementIndividualResponse(buf[i:n])
	c.EmbezzlementIndividuals[int64(embezzlementindividual.Id)] = embezzlementindividual
	return buf, n
}

func PutEmbezzlementIndividualVal(p interface{}, b interface{}) interface{} {
	put := p.(PutEmbezzlementIndividualRequest)
	embezzlementindividual := b.(EmbezzlementIndividual)
	if put.Data.Body.ReportId != 0 {
		embezzlementindividual.ReportId = put.Data.Body.ReportId
	}
	if put.Data.Body.IndividualId != 0 {
		embezzlementindividual.IndividualId = put.Data.Body.IndividualId
	}
	/*
		Add logic to save changes to report and individual
	*/

	return embezzlementindividual
}
