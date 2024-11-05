package cache

import (
	"encoding/json"
	"fmt"
	"net"
	"strconv"
)

type Contact struct {
	Id    int    `json:"id"`
	Phone string `json:"phone"`
	Email string `json:"email"`
}

type ContactsResponse struct {
	Response   []Contact `json:"response"`
	IsDisposed bool      `json:"isDisposed"`
	Id         string    `json:"id"`
}

type ContactResponse struct {
	Contact    Contact `json:"response"`
	IsDisposed bool    `json:"isDisposed"`
	Id         string  `json:"id"`
}

type ContactData struct {
	Id   string  `json:"id"`
	Body Contact `json:"body"`
}

type PutContactRequest struct {
	Pattern Pattern     `json:"pattern"`
	Data    ContactData `json:"data"`
	Id      string      `json:"id"`
}

func ParseContactsResponse(msg []byte) []Contact {
	contact := ContactsResponse{}
	err := json.Unmarshal(msg, &contact)
	if err != nil {
		fmt.Println(err)
	}
	return contact.Response
}

func ParseContactResponse(msg []byte) Contact {
	contact := ContactResponse{}
	err := json.Unmarshal(msg, &contact)
	if err != nil {
		fmt.Println(err)
	}
	return contact.Contact
}

func ParsePutContactRequest(msg []byte) (interface{}, string, int) {
	contact := PutContactRequest{}
	err := json.Unmarshal(msg, &contact)
	if err != nil {
		fmt.Println(err)
	}
	return contact, contact.Data.Id, contact.Data.Body.Id
}

func (c *Cache) LoadContacts(conn net.Conn) {
	buf := make([]byte, 8192)
	conn.Write([]byte(`64#{"pattern":{"path":"get/contact"},"data":"","id":"loadcontacts"}`))
	n, err := conn.Read(buf)
	if err != nil {
		panic(fmt.Sprintf("Failed to load Contact table: %s", err))
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
	contacts := ParseContactsResponse(msg[delimiter:])
	for _, con := range contacts {
		c.Contacts[int64(con.Id)] = con
	}
}

func (c *Cache) PostContact(conn net.Conn, buf, data, reqId []byte) ([]byte, int) {
	buf, i, n := Post(c.Contacts, conn, buf, data)
	contact := ParseContactResponse(buf[i:n])
	c.Contacts[int64(contact.Id)] = contact
	return buf, n
}

func PutContactVal(p interface{}, c interface{}) interface{} {
	put := p.(PutContactRequest)
	contact := c.(Contact)
	if put.Data.Body.Phone != "" {
		contact.Phone = put.Data.Body.Phone
	}
	if put.Data.Body.Email != "" {
		contact.Email = put.Data.Body.Email
	}
	return contact
}
