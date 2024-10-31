package cache

import (
	"encoding/json"
	"fmt"
	"net"
	"strconv"
)

type User struct {
	Id       int    `json:"id"`
	Username string `json:"username"`
	Role     string `json:"role"`
}

type UsersResponse struct {
	Response   []User `json:"response"`
	IsDisposed bool   `json:"isDisposed"`
	Id         string `json:"id"`
}

type UserResponse struct {
	User       User   `json:"response"`
	IsDisposed bool   `json:"isDisposed"`
	Id         string `json:"id"`
}

type UserData struct {
	Id   string `json:"id"`
	Body User   `json:"body"`
}

type PutUserRequest struct {
	Pattern Pattern  `json:"pattern"`
	Data    UserData `json:"data"`
	Id      string   `json:"id"`
}

func ParseUsersResponse(msg []byte) UsersResponse {
	users := UsersResponse{}
	err := json.Unmarshal(msg, &users)
	if err != nil {
		fmt.Println(err)
	}
	return users
}

func ParseUserResponse(msg []byte) UserResponse {
	user := UserResponse{}
	err := json.Unmarshal(msg, &user)
	if err != nil {
		fmt.Println(err)
	}
	return user
}

func ParsePutUserRequest(msg []byte) (interface{}, string, int) {
	user := PutUserRequest{}
	err := json.Unmarshal(msg, &user)
	if err != nil {
		fmt.Println(err)
	}
	return user, user.Data.Id, user.Data.Body.Id
}

func (c *Cache) LoadUsers(conn net.Conn) {
	buf := make([]byte, 2048)
	conn.Write([]byte(`58#{"pattern":{"path":"get/user"},"data":"","id":"loadusers"}`))
	n, err := conn.Read(buf)
	if err != nil {
		panic(fmt.Sprintf("Failed to load Users table: %s", err))
	}
	msg := buf[:n]
	i := 0
	for msg[i] != '#' {
		i += 1
	}
	i += 1
	users := ParseUsersResponse(msg[i:])
	for _, use := range users.Response {
		c.Users[int64(use.Id)] = use
	}
}

// func (c *Cache) GetUser(conn net.Conn, data, reqId []byte, id int64) ([]byte, int) {
// 	us := []byte(`{"response":[`)
// 	for _, use := range c.Users {
// 		u, err := json.Marshal(use)
// 		if err != nil {
// 			fmt.Println("error json marshal cached Users", err)
// 		}
// 		us = append(us, u...)
// 		us = append(us, byte(','))
// 	}
// 	if us[len(us)-1] == ',' {
// 		us = us[:len(us)-1]
// 	}
// 	us = append(us, []byte(`],"isDisposed":true,"id":"`)...)
// 	us = append(us, reqId...)
// 	us = append(us, []byte(`"}`)...)
// 	leng := len(us)
// 	strlen := strconv.Itoa(leng) + "#"
// 	buf := append([]byte(strlen), us...)
// 	return buf, len(buf)
// }

func (c *Cache) GetUserById(conn net.Conn, data, reqId []byte, id int64) ([]byte, int) {
	us := []byte(`{"response":`)
	if user, ok := c.Users[id]; ok {
		u, err := json.Marshal(user)
		if err != nil {
			fmt.Println("error json marshal cached user", err)
		}
		us = append(us, u...)
	} else {
		us = append(us, []byte(`""`)...)
	}
	us = append(us, []byte(`,"isDisposed":true,"id":"`)...)
	us = append(us, reqId...)
	us = append(us, []byte(`"}`)...)
	leng := len(us)
	strlen := strconv.Itoa(leng) + "#"
	buf := append([]byte(strlen), us...)
	return buf, len(buf)
}

func (c *Cache) PostUser(conn net.Conn, buf, data, reqId []byte) ([]byte, int) {
	buf, i, n := Post(c.Users, conn, buf, data)
	resp := ParseUserResponse(buf[i:n])
	c.Users[int64(resp.User.Id)] = resp.User
	return buf, n
}

func PutUserVal(p interface{}, b interface{}) interface{} {
	put := p.(PutUserRequest)
	user := b.(User)
	if put.Data.Body.Role != "" {
		user.Role = put.Data.Body.Role
	}
	if put.Data.Body.Username != "" {
		user.Username = put.Data.Body.Username
	}
	return user
}
