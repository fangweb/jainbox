package main

import (
	"log"
	"net/http"
	"strings"
)

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
	h := r.Header.Get("Authorization")

	if h == "" {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	
	split := strings.Split(h, " ")
	
	if split[0] != "Bearer" {
		log.Println("Invalid authentication token type.")
		w.WriteHeader(http.StatusBadRequest)
		return	  
	}

	tokenStr := split[1]
	claims, ok := s.authentication.parse(tokenStr)

	if ok != true {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}

	if username, ok := claims["username"].(string); ok {
		client := &Client{username: username, conn: conn, write: make(chan []byte, 256)}
		s.clientPool.register <- client
		go client.writer()
	} else {
		log.Println("Could not assert claims[\"username\"]")
	}
}
