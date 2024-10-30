package cache

import (
	"encoding/json"
	"fmt"
	"net"
	"strconv"
)

type Cache struct {
	Users map[int64]User
}

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

type Pattern struct {
	Path string `json:"path"`
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

func (c *Cache) Load(conn net.Conn) {
	buf := make([]byte, 2048)
	conn.Write([]byte(`53#{"pattern":{"path":"get/user"},"data":"","id":"load"}`))
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
	users := parseUsersResponse(msg[i:])
	for _, user := range users.Response {
		c.Users[int64(user.Id)] = user
	}
}

func (c *Cache) Query(conn net.Conn, buf, data, req, reqId []byte, id int64) ([]byte, int) {
	switch string(req) {
	case "get/user":
		us := []byte(`{"response":[`)
		for _, user := range c.Users {
			u, err := json.Marshal(user)
			if err != nil {
				fmt.Println("error json marshal cached Users", err)
			}
			us = append(us, u...)
			us = append(us, byte(','))
		}
		if us[len(us)-1] == ',' {
			us = us[:len(us)-1]
		}
		us = append(us, []byte(`],"isDisposed":true,"id":"`)...)
		us = append(us, reqId...)
		us = append(us, []byte(`"}`)...)
		leng := len(us)
		strlen := strconv.Itoa(leng) + "#"
		buf = append([]byte(strlen), us...)
		return buf, len(buf)

	case "getById/user":
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
		buf = append([]byte(strlen), us...)
		return buf, len(buf)

	case "post/user":
		conn.Write(data)

		len, err := conn.Read(buf)
		if err != nil {
			fmt.Println("read error: ", err)
		}
		i := 0
		for buf[i] != '#' {
			i += 1
		}
		i += 1
		resp := parseUserResponse(buf[i:len])
		c.Users[int64(resp.User.Id)] = resp.User

		return buf, len

	case "putuser":
		i := 0
		for data[i] != '#' {
			i += 1
		}
		i += 1
		put := parsePutRequest(data[i:])
		userId, _ := strconv.ParseInt(put.Data.Id, 10, 64)

		user, ok := c.Users[userId]
		if !ok {
			buf = append([]byte(`{"response":"","isDisposed":true,"id":"`), reqId...)
			buf = append(buf, []byte(`"}`)...)
			n := len(buf)
			strlen := strconv.Itoa(n) + "#"
			buf = append([]byte(strlen), buf...)

			return buf, len(buf)
		}
		if put.Data.Body.Id != 0 {
			if int64(put.Data.Body.Id) != userId {
				buf = append([]byte(`{"response":"","isDisposed":true,"id":"`), reqId...)
				buf = append(buf, []byte(`"}`)...)
				n := len(buf)
				strlen := strconv.Itoa(n) + "#"
				buf = append([]byte(strlen), buf...)

				return buf, len(buf)
			}
		}
		if put.Data.Body.Role != "" {
			user.Role = put.Data.Body.Role
		}
		if put.Data.Body.Username != "" {
			user.Username = put.Data.Body.Username
		}
		c.Users[userId] = user

		go conn.Write(data)

		buf = []byte(`{"response":`)
		u, err := json.Marshal(user)
		if err != nil {
			fmt.Println("error json marshal cached user", err)
		}
		buf = append(buf, u...)
		buf = append(buf, []byte(`,"isDisposed":true,"id":"`)...)
		buf = append(buf, reqId...)
		buf = append(buf, []byte(`"}`)...)
		n := len(buf)
		strlen := strconv.Itoa(n) + "#"
		buf = append([]byte(strlen), buf...)
		return buf, len(buf)

	case "deleteuser":
		go conn.Write(data)
		buf := []byte(`{"response":{"raw":[],"affected":`)
		if _, ok := c.Users[id]; ok {
			delete(c.Users, id)
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

func parseUsersResponse(msg []byte) UsersResponse {
	users := UsersResponse{}
	err := json.Unmarshal(msg, &users)
	if err != nil {
		fmt.Println(err)
	}
	return users
}

func parseUserResponse(msg []byte) UserResponse {
	user := UserResponse{}
	err := json.Unmarshal(msg, &user)
	if err != nil {
		fmt.Println(err)
	}
	return user
}

func parsePutRequest(msg []byte) PutUserRequest {
	user := PutUserRequest{}
	err := json.Unmarshal(msg, &user)
	if err != nil {
		fmt.Println(err)
	}
	return user
}
