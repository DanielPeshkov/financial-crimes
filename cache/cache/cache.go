package cache

import (
	"encoding/json"
	"fmt"
	"net"
	"strconv"
)

type Cache struct {
	Users                   map[int64]User
	Contacts                map[int64]Contact
	Addresses               map[int64]Address
	Individuals             map[int64]Individual
	Businesses              map[int64]Business
	OtherReports            map[int64]OtherReport
	OtherIndividuals        map[int64]OtherIndividual
	OtherBusinesses         map[int64]OtherBusiness
	LaunderingReports       map[int64]LaunderingReport
	LaunderingIndividuals   map[int64]LaunderingIndividual
	LaunderingBusinesses    map[int64]LaunderingBusiness
	InstitutionReports      map[int64]InstitutionReport
	InstitutionIndividuals  map[int64]InstitutionIndividual
	InstitutionBusinesses   map[int64]InstitutionBusiness
	MortgageReports         map[int64]MortgageReport
	MortgageIndividuals     map[int64]MortgageIndividual
	MortgageBusinesses      map[int64]MortgageBusiness
	InvestmentReports       map[int64]InvestmentReport
	InvestmentIndividuals   map[int64]InvestmentIndividual
	InvestmentBusinesses    map[int64]InvestmentBusiness
	EmbezzlementReports     map[int64]EmbezzlementReport
	EmbezzlementIndividuals map[int64]EmbezzlementIndividual
	EmbezzlementBusinesses  map[int64]EmbezzlementBusiness
}

type Pattern struct {
	Path string `json:"path"`
}

func (c *Cache) Load(conn net.Conn) {
	c.LoadUsers(conn)
	c.LoadContacts(conn)
	c.LoadAddress(conn)
	c.LoadIndividual(conn)
	c.LoadBusiness(conn)
	c.LoadOtherReport(conn)
	c.LoadOtherIndividual(conn)
	c.LoadOtherBusiness(conn)
	c.LoadLaunderingReport(conn)
	c.LoadLaunderingIndividual(conn)
	c.LoadLaunderingBusiness(conn)
	c.LoadInstitutionReport(conn)
	c.LoadInstitutionIndividual(conn)
	c.LoadInstitutionBusiness(conn)
	c.LoadMortgageReport(conn)
	c.LoadMortgageIndividual(conn)
	c.LoadMortgageBusiness(conn)
	c.LoadInvestmentReport(conn)
	c.LoadInvestmentIndividual(conn)
	c.LoadInvestmentBusiness(conn)
	c.LoadEmbezzlementReport(conn)
	c.LoadEmbezzlementIndividual(conn)
	c.LoadEmbezzlementBusiness(conn)
}

func (c *Cache) Query(conn net.Conn, buf, data, req, reqId []byte, id int64) ([]byte, int) {
	switch string(req) {
	case "get/user":
		return Get(c, c.Users, conn, req, reqId)

	case "getById/user":
		return GetById(c, c.Users, conn, data, req, reqId, id)

	case "post/user":
		return c.PostUser(conn, buf, data, reqId)

	case "putuser":
		return Put(c.Users, conn, data, req, reqId)

	case "deleteuser":
		return Delete(c.Users, conn, data, reqId, id)

	case "get/contact":
		return Get(c, c.Contacts, conn, req, reqId)

	case "getById/contact":
		return GetById(c, c.Contacts, conn, data, req, reqId, id)

	case "post/contact":
		return c.PostContact(conn, buf, data, reqId)

	case "putcontact":
		return Put(c.Contacts, conn, data, req, reqId)

	case "deletecontact":
		return Delete(c.Contacts, conn, data, reqId, id)

	case "get/address":
		return Get(c, c.Addresses, conn, req, reqId)

	case "getById/address":
		return GetById(c, c.Addresses, conn, data, req, reqId, id)

	case "post/address":
		return c.PostAddress(conn, buf, data, reqId)

	case "putaddress":
		return Put(c.Addresses, conn, data, req, reqId)

	case "deleteaddress":
		return Delete(c.Addresses, conn, data, reqId, id)

	case "get/individual":
		return Get(c, c.Individuals, conn, req, reqId)

	case "getById/individual":
		return GetById(c, c.Individuals, conn, data, req, reqId, id)

	case "post/individual":
		return c.PostIndividual(conn, buf, data, reqId)

	case "putindividual":
		return Put(c.Individuals, conn, data, req, reqId)

	case "deleteindividual":
		return Delete(c.Individuals, conn, data, reqId, id)

	case "get/business":
		return Get(c, c.Businesses, conn, req, reqId)

	case "getById/business":
		return GetById(c, c.Businesses, conn, data, req, reqId, id)

	case "post/business":
		return c.PostBusiness(conn, buf, data, reqId)

	case "putbusiness":
		return Put(c.Businesses, conn, data, req, reqId)

	case "deletebusiness":
		return Delete(c.Businesses, conn, data, reqId, id)

	case "get/other/report":
		return Get(c, c.OtherReports, conn, req, reqId)

	case "getById/other/report":
		return GetById(c, c.OtherReports, conn, data, req, reqId, id)

	case "post/other/report":
		return c.PostOtherReport(conn, buf, data, reqId)

	case "putother/report":
		return Put(c.OtherReports, conn, data, req, reqId)

	case "deleteother/report":
		return Delete(c.OtherReports, conn, data, reqId, id)

	case "get/other/individual":
		return Get(c, c.OtherIndividuals, conn, req, reqId)

	case "getById/other/individual":
		return GetById(c, c.OtherIndividuals, conn, data, req, reqId, id)

	case "post/other/individual":
		return c.PostOtherIndividual(conn, buf, data, reqId)

	case "putother/individual":
		return Put(c.OtherIndividuals, conn, data, req, reqId)

	case "deleteother/individual":
		return Delete(c.OtherIndividuals, conn, data, reqId, id)

	case "get/other/business":
		return Get(c, c.OtherBusinesses, conn, req, reqId)

	case "getById/other/business":
		return GetById(c, c.OtherBusinesses, conn, data, req, reqId, id)

	case "post/other/business":
		return c.PostOtherBusiness(conn, buf, data, reqId)

	case "putother/business":
		return Put(c.OtherBusinesses, conn, data, req, reqId)

	case "deleteother/business":
		return Delete(c.OtherBusinesses, conn, data, reqId, id)

	case "get/laundering/report":
		return Get(c, c.LaunderingReports, conn, req, reqId)

	case "getById/laundering/report":
		return GetById(c, c.LaunderingReports, conn, data, req, reqId, id)

	case "post/laundering/report":
		return c.PostLaunderingReport(conn, buf, data, reqId)

	case "putlaundering/report":
		return Put(c.LaunderingReports, conn, data, req, reqId)

	case "deletelaundering/report":
		return Delete(c.LaunderingReports, conn, data, reqId, id)

	case "get/laundering/individual":
		return Get(c, c.LaunderingIndividuals, conn, req, reqId)

	case "getById/laundering/individual":
		return GetById(c, c.LaunderingIndividuals, conn, data, req, reqId, id)

	case "post/laundering/individual":
		return c.PostLaunderingIndividual(conn, buf, data, reqId)

	case "putlaundering/individual":
		return Put(c.LaunderingIndividuals, conn, data, req, reqId)

	case "deletelaundering/individual":
		return Delete(c.LaunderingIndividuals, conn, data, reqId, id)

	case "get/laundering/business":
		return Get(c, c.LaunderingBusinesses, conn, req, reqId)

	case "getById/laundering/business":
		return GetById(c, c.LaunderingBusinesses, conn, data, req, reqId, id)

	case "post/laundering/business":
		return c.PostLaunderingBusiness(conn, buf, data, reqId)

	case "putlaundering/business":
		return Put(c.LaunderingBusinesses, conn, data, req, reqId)

	case "deletelaundering/business":
		return Delete(c.LaunderingBusinesses, conn, data, reqId, id)

	case "get/institution/report":
		return Get(c, c.InstitutionReports, conn, req, reqId)

	case "getById/institution/report":
		return GetById(c, c.InstitutionReports, conn, data, req, reqId, id)

	case "post/institution/report":
		return c.PostInstitutionReport(conn, buf, data, reqId)

	case "putinstitution/report":
		return Put(c.InstitutionReports, conn, data, req, reqId)

	case "deleteinstitution/report":
		return Delete(c.InstitutionReports, conn, data, reqId, id)

	case "get/institution/individual":
		return Get(c, c.InstitutionIndividuals, conn, req, reqId)

	case "getById/institution/individual":
		return GetById(c, c.InstitutionIndividuals, conn, data, req, reqId, id)

	case "post/institution/individual":
		return c.PostInstitutionIndividual(conn, buf, data, reqId)

	case "putinstitution/individual":
		return Put(c.InstitutionIndividuals, conn, data, req, reqId)

	case "deleteinstitution/individual":
		return Delete(c.InstitutionIndividuals, conn, data, reqId, id)

	case "get/institution/business":
		return Get(c, c.InstitutionBusinesses, conn, req, reqId)

	case "getById/institution/business":
		return GetById(c, c.InstitutionBusinesses, conn, data, req, reqId, id)

	case "post/institution/business":
		return c.PostInstitutionBusiness(conn, buf, data, reqId)

	case "putinstitution/business":
		return Put(c.InstitutionBusinesses, conn, data, req, reqId)

	case "deleteinstitution/business":
		return Delete(c.InstitutionBusinesses, conn, data, reqId, id)

	case "get/mortgage/report":
		return Get(c, c.MortgageReports, conn, req, reqId)

	case "getById/mortgage/report":
		return GetById(c, c.MortgageReports, conn, data, req, reqId, id)

	case "post/mortgage/report":
		return c.PostMortgageReport(conn, buf, data, reqId)

	case "putmortgage/report":
		return Put(c.MortgageReports, conn, data, req, reqId)

	case "deletemortgage/report":
		return Delete(c.MortgageReports, conn, data, reqId, id)

	case "get/mortgage/individual":
		return Get(c, c.MortgageIndividuals, conn, req, reqId)

	case "getById/mortgage/individual":
		return GetById(c, c.MortgageIndividuals, conn, data, req, reqId, id)

	case "post/mortgage/individual":
		return c.PostMortgageIndividual(conn, buf, data, reqId)

	case "putmortgage/individual":
		return Put(c.MortgageIndividuals, conn, data, req, reqId)

	case "deletemortgage/individual":
		return Delete(c.MortgageIndividuals, conn, data, reqId, id)

	case "get/mortgage/business":
		return Get(c, c.MortgageBusinesses, conn, req, reqId)

	case "getById/mortgage/business":
		return GetById(c, c.MortgageBusinesses, conn, data, req, reqId, id)

	case "post/mortgage/business":
		return c.PostMortgageBusiness(conn, buf, data, reqId)

	case "putmortgage/business":
		return Put(c.MortgageBusinesses, conn, data, req, reqId)

	case "deletemortgage/business":
		return Delete(c.MortgageBusinesses, conn, data, reqId, id)

	case "get/investment/report":
		return Get(c, c.InvestmentReports, conn, req, reqId)

	case "getById/investment/report":
		return GetById(c, c.InvestmentReports, conn, data, req, reqId, id)

	case "post/investment/report":
		return c.PostInvestmentReport(conn, buf, data, reqId)

	case "putinvestment/report":
		return Put(c.InvestmentReports, conn, data, req, reqId)

	case "deleteinvestment/report":
		return Delete(c.InvestmentReports, conn, data, reqId, id)

	case "get/investment/individual":
		return Get(c, c.InvestmentIndividuals, conn, req, reqId)

	case "getById/investment/individual":
		return GetById(c, c.InvestmentIndividuals, conn, data, req, reqId, id)

	case "post/investment/individual":
		return c.PostInvestmentIndividual(conn, buf, data, reqId)

	case "putinvestment/individual":
		return Put(c.InvestmentIndividuals, conn, data, req, reqId)

	case "deleteinvestment/individual":
		return Delete(c.InvestmentIndividuals, conn, data, reqId, id)

	case "get/investment/business":
		return Get(c, c.InvestmentBusinesses, conn, req, reqId)

	case "getById/investment/business":
		return GetById(c, c.InvestmentBusinesses, conn, data, req, reqId, id)

	case "post/investment/business":
		return c.PostInvestmentBusiness(conn, buf, data, reqId)

	case "putinvestment/business":
		return Put(c.InvestmentBusinesses, conn, data, req, reqId)

	case "deleteinvestment/business":
		return Delete(c.InvestmentBusinesses, conn, data, reqId, id)

	case "get/embezzlement/report":
		return Get(c, c.EmbezzlementReports, conn, req, reqId)

	case "getById/embezzlement/report":
		return GetById(c, c.EmbezzlementReports, conn, data, req, reqId, id)

	case "post/embezzlement/report":
		return c.PostEmbezzlementReport(conn, buf, data, reqId)

	case "putembezzlement/report":
		return Put(c.EmbezzlementReports, conn, data, req, reqId)

	case "deleteembezzlement/report":
		return Delete(c.EmbezzlementReports, conn, data, reqId, id)

	case "get/embezzlement/individual":
		return Get(c, c.EmbezzlementIndividuals, conn, req, reqId)

	case "getById/embezzlement/individual":
		return GetById(c, c.EmbezzlementIndividuals, conn, data, req, reqId, id)

	case "post/embezzlement/individual":
		return c.PostEmbezzlementIndividual(conn, buf, data, reqId)

	case "putembezzlement/individual":
		return Put(c.EmbezzlementIndividuals, conn, data, req, reqId)

	case "deleteembezzlement/individual":
		return Delete(c.EmbezzlementIndividuals, conn, data, reqId, id)

	case "get/embezzlement/business":
		return Get(c, c.EmbezzlementBusinesses, conn, req, reqId)

	case "getById/embezzlement/business":
		return GetById(c, c.EmbezzlementBusinesses, conn, data, req, reqId, id)

	case "post/embezzlement/business":
		return c.PostEmbezzlementBusiness(conn, buf, data, reqId)

	case "putembezzlement/business":
		return Put(c.EmbezzlementBusinesses, conn, data, req, reqId)

	case "deleteembezzlement/business":
		return Delete(c.EmbezzlementBusinesses, conn, data, reqId, id)

	default:
		fmt.Println("Default: ", string(req))
		conn.Write(data)

		len, err := conn.Read(buf)
		if err != nil {
			fmt.Println("read error: ", err)
		}
		return buf, len
	}
}

var nest = map[string]func(*Cache, interface{}) interface{}{
	"get/individual":                  NestIndividual,
	"getById/individual":              NestIndividual,
	"get/business":                    NestBusiness,
	"getById/business":                NestBusiness,
	"get/other/report":                NestOtherReport,
	"getById/other/report":            NestOtherReport,
	"get/other/individual":            NestOtherIndividual,
	"getById/other/individual":        NestOtherIndividual,
	"get/other/business":              NestOtherBusiness,
	"getById/other/business":          NestOtherBusiness,
	"get/laundering/report":           NestLaunderingReport,
	"getById/laundering/report":       NestLaunderingReport,
	"get/laundering/individual":       NestLaunderingIndividual,
	"getById/laundering/individual":   NestLaunderingIndividual,
	"get/laundering/business":         NestLaunderingBusiness,
	"getById/laundering/business":     NestLaunderingBusiness,
	"get/institution/report":          NestInstitutionReport,
	"getById/institution/report":      NestInstitutionReport,
	"get/institution/individual":      NestInstitutionIndividual,
	"getById/institution/individual":  NestInstitutionIndividual,
	"get/institution/business":        NestInstitutionBusiness,
	"getById/institution/business":    NestInstitutionBusiness,
	"get/mortgage/report":             NestMortgageReport,
	"getById/mortgage/report":         NestMortgageReport,
	"get/mortgage/individual":         NestMortgageIndividual,
	"getById/mortgage/individual":     NestMortgageIndividual,
	"get/mortgage/business":           NestMortgageBusiness,
	"getById/mortgage/business":       NestMortgageBusiness,
	"get/investment/report":           NestInvestmentReport,
	"getById/investment/report":       NestInvestmentReport,
	"get/investment/individual":       NestInvestmentIndividual,
	"getById/investment/individual":   NestInvestmentIndividual,
	"get/investment/business":         NestInvestmentBusiness,
	"getById/investment/business":     NestInvestmentBusiness,
	"get/embezzlement/report":         NestEmbezzlementReport,
	"getById/embezzlement/report":     NestEmbezzlementReport,
	"get/embezzlement/individual":     NestEmbezzlementIndividual,
	"getById/embezzlement/individual": NestEmbezzlementIndividual,
	"get/embezzlement/business":       NestEmbezzlementBusiness,
	"getById/embezzlement/business":   NestEmbezzlementBusiness,
}

var parsePuts = map[string]func([]byte) (interface{}, string, int){
	"putuser":                    ParsePutUserRequest,
	"putcontact":                 ParsePutContactRequest,
	"putaddress":                 ParsePutAddressRequest,
	"putindividual":              ParsePutIndividualRequest,
	"putbusiness":                ParsePutBusinessRequest,
	"putother/report":            ParsePutOtherReportRequest,
	"putother/individual":        ParsePutOtherIndividualRequest,
	"putother/business":          ParsePutOtherBusinessRequest,
	"putlaundering/report":       ParsePutLaunderingReportRequest,
	"putlaundering/individual":   ParsePutLaunderingIndividualRequest,
	"putlaundering/business":     ParsePutLaunderingBusinessRequest,
	"putinstitution/report":      ParsePutInstitutionReportRequest,
	"putinstitution/individual":  ParsePutInstitutionIndividualRequest,
	"putinstitution/business":    ParsePutInstitutionBusinessRequest,
	"putmortgage/report":         ParsePutMortgageReportRequest,
	"putmortgage/individual":     ParsePutMortgageIndividualRequest,
	"putmortgage/business":       ParsePutMortgageBusinessRequest,
	"putinvestment/report":       ParsePutInvestmentReportRequest,
	"putinvestment/individual":   ParsePutInvestmentIndividualRequest,
	"putinvestment/business":     ParsePutInvestmentBusinessRequest,
	"putembezzlement/report":     ParsePutEmbezzlementReportRequest,
	"putembezzlement/individual": ParsePutEmbezzlementIndividualRequest,
	"putembezzlement/business":   ParsePutEmbezzlementBusinessRequest,
}

var putVals = map[string]func(interface{}, interface{}) interface{}{
	"putuser":                    PutUserVal,
	"putcontact":                 PutContactVal,
	"putaddress":                 PutAddressVal,
	"putindividual":              PutIndividualVal,
	"putbusiness":                PutBusinessVal,
	"putother/report":            PutOtherReportVal,
	"putother/individual":        PutOtherIndividualVal,
	"putother/business":          PutOtherBusinessVal,
	"putlaundering/report":       PutLaunderingReportVal,
	"putlaundering/individual":   PutLaunderingIndividualVal,
	"putlaundering/business":     PutLaunderingBusinessVal,
	"putinstitution/report":      PutInstitutionReportVal,
	"putinstitution/individual":  PutInstitutionIndividualVal,
	"putinstitution/business":    PutInstitutionBusinessVal,
	"putmortgage/report":         PutMortgageReportVal,
	"putmortgage/individual":     PutMortgageIndividualVal,
	"putmortgage/business":       PutMortgageBusinessVal,
	"putinvestment/report":       PutInvestmentReportVal,
	"putinvestment/individual":   PutInvestmentIndividualVal,
	"putinvestment/business":     PutInvestmentBusinessVal,
	"putembezzlement/report":     PutEmbezzlementReportVal,
	"putembezzlement/individual": PutEmbezzlementIndividualVal,
	"putembezzlement/business":   PutEmbezzlementBusinessVal,
}

func Get[T any](c *Cache, m map[int64]T, conn net.Conn, req, reqId []byte) ([]byte, int) {
	f, ok := nest[string(req)]
	buf := []byte(`{"response":[`)
	for _, item := range m {
		if ok {
			item = f(c, item).(T)
		}
		js, err := json.Marshal(item)
		if err != nil {
			fmt.Println("error json marshal cached object", err)
		}
		buf = append(buf, js...)
		buf = append(buf, byte(','))
	}
	if buf[len(buf)-1] == ',' {
		buf = buf[:len(buf)-1]
	}
	buf = append(buf, []byte(`],"isDisposed":true,"id":"`)...)
	buf = append(buf, reqId...)
	buf = append(buf, []byte(`"}`)...)
	n := len(buf)
	strlen := strconv.Itoa(n) + "#"
	buf = append([]byte(strlen), buf...)
	return buf, len(buf)
}

func GetById[T any](c *Cache, m map[int64]T, conn net.Conn, data, req, reqId []byte, id int64) ([]byte, int) {
	buf := []byte(`{"response":`)
	if item, ok := m[id]; ok {
		f, ok := nest[string(req)]
		if ok {
			item = f(c, item).(T)
		}
		con, err := json.Marshal(item)
		if err != nil {
			fmt.Println("error json marshal cached object", err)
		}
		buf = append(buf, con...)
	} else {
		buf = append(buf, []byte(`""`)...)
	}
	buf = append(buf, []byte(`,"isDisposed":true,"id":"`)...)
	buf = append(buf, reqId...)
	buf = append(buf, []byte(`"}`)...)
	n := len(buf)
	strlen := strconv.Itoa(n) + "#"
	buf = append([]byte(strlen), buf...)
	return buf, len(buf)
}

func Post[T any](m map[int64]T, conn net.Conn, buf, data []byte) ([]byte, int, int) {
	conn.Write(data)
	n, err := conn.Read(buf)
	if err != nil {
		fmt.Println("read error: ", err)
	}
	i := 0
	for buf[i] != '#' {
		i += 1
	}
	i += 1
	return buf, i, n
}

func Put[T any](m map[int64]T, conn net.Conn, data, req, reqId []byte) ([]byte, int) {
	var buf []byte
	i := 0
	for data[i] != '#' {
		i += 1
	}
	i += 1
	f := parsePuts[string(req)]
	put, strDataId, bodyId := f(data[i:])
	dataId, _ := strconv.ParseInt(strDataId, 10, 64)

	item, ok := m[dataId]
	if !ok {
		buf = append([]byte(`{"response":"","isDisposed":true,"id":"`), reqId...)
		buf = append(buf, []byte(`"}`)...)
		n := len(buf)
		strlen := strconv.Itoa(n) + "#"
		buf = append([]byte(strlen), buf...)

		return buf, len(buf)
	}
	if bodyId != 0 {
		if int64(bodyId) != dataId {
			buf = append([]byte(`{"response":"","isDisposed":true,"id":"`), reqId...)
			buf = append(buf, []byte(`"}`)...)
			n := len(buf)
			strlen := strconv.Itoa(n) + "#"
			buf = append([]byte(strlen), buf...)

			return buf, len(buf)
		}
	}
	f2, ok := putVals[string(req)]
	if ok {
		item = f2(put, item).(T)
	}
	m[dataId] = item

	go conn.Write(data)

	buf = []byte(`{"response":`)
	u, err := json.Marshal(item)
	if err != nil {
		fmt.Println("error json marshal cached item", err)
	}
	buf = append(buf, u...)
	buf = append(buf, []byte(`,"isDisposed":true,"id":"`)...)
	buf = append(buf, reqId...)
	buf = append(buf, []byte(`"}`)...)
	n := len(buf)
	strlen := strconv.Itoa(n) + "#"
	buf = append([]byte(strlen), buf...)
	return buf, len(buf)
}

func Delete[T any](m map[int64]T, conn net.Conn, data, reqId []byte, id int64) ([]byte, int) {
	go conn.Write(data)
	buf := []byte(`{"response":{"raw":[],"affected":`)
	if _, ok := m[id]; ok {
		delete(m, id)
		buf = append(buf, []byte(`1},"isDisposed":true,"id":"`)...)
	} else {
		buf = append(buf, []byte(`0},"isDisposed":true,"id":"`)...)
	}
	buf = append(buf, reqId...)
	buf = append(buf, []byte(`"}`)...)
	n := len(buf)
	strlen := strconv.Itoa(n) + "#"
	buf = append([]byte(strlen), buf...)

	return buf, len(buf)
}
