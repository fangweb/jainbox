package main

import (
	"log"
	"net/http"
	"net/url"
	"strings"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

// Server mantains websocket connections
type Server struct {
	authentication *Authentication
	clientPool     *ClientPool
	addr           string
}

func (s *Server) run() {
	s.configureRoutes()
	log.Printf("Websocket server listening on address %v", s.addr)
	err := http.ListenAndServe(s.addr, nil)
	if err != nil {
		log.Fatal("Error: ", err)
	}
}

func (s *Server) configureRoutes() {
	http.HandleFunc("/ws", s.wsHandler)
}

func (s *Server) wsHandler(w http.ResponseWriter, r *http.Request) {
	cookie, err := r.Cookie("X-Authorization")

	if err != nil {
		log.Println("Credentials not provided.")
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	credentials, err := url.QueryUnescape(cookie.Value)

	if err != nil {
		log.Println("Could not escape cookie value.")
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	split := strings.Split(credentials, " ")

	if split[0] != "Bearer" {
		log.Println("Invalid authentication token type.")
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	tokenStr := split[1]
	claims, ok := s.authentication.parse(tokenStr)

	if ok != true {
		log.Println("Token failed to parse.")
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}

	if username, ok := claims["username"].(string); ok {
		log.Printf("User %v has successfully upgraded.\n", username)
		client := &Client{username: username, conn: conn, write: make(chan []byte, 256), clientPool: s.clientPool}
		s.clientPool.register <- client
		go client.writer()
		go client.reader()
	} else {
		log.Println("Could not assert claims[\"username\"]")
	}
}
