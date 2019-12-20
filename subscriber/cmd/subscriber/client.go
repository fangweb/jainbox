package main

import (
	"log"
	"time"

	"github.com/gorilla/websocket"
)

// New
const (
	writeWait = 10 * time.Second

	pongWait = 60 * time.Second

	pingPeriod = (pongWait * 9) / 10

	maxMessageSize = 512
)

var (
	newline = []byte{'\n'}
	space   = []byte{' '}
)

// Client for websocket connections
type Client struct {
	username string

	conn *websocket.Conn

	write chan []byte

	clientPool *ClientPool
}

func (c *Client) reader() {
	defer func() {
		c.clientPool.unregister <- c

		// Close writer goroutine
		close(c.write)

		c.conn.Close()
		log.Printf("User %v has disconnected.", c.username)
	}()
	c.conn.SetReadLimit(maxMessageSize)
	c.conn.SetReadDeadline(time.Now().Add(pongWait))
	c.conn.SetPongHandler(func(string) error { c.conn.SetReadDeadline(time.Now().Add(pongWait)); return nil })
	for {
		_, _, err := c.conn.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("error: %v\n", err)
			}
			break
		}
	}
}

func (c *Client) writer() {
	ticker := time.NewTicker(pingPeriod)
	defer func() {
		ticker.Stop()
		c.conn.Close()
		log.Printf("Client writer for %v has closed.", c.username)
	}()

	for {
		select {
		case notification, ok := <-c.write:
			c.conn.SetWriteDeadline(time.Now().Add(writeWait))
			if !ok {
				c.conn.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}

			// May write multiple messages with NextWriter
			w, err := c.conn.NextWriter(websocket.TextMessage)
			if err != nil {
				log.Println(err)
				return
			}
			w.Write(notification)

			n := len(c.write)
			for i := 0; i < n; i++ {
				w.Write(newline)
				w.Write([]byte(<-c.write))
			}

			if err := w.Close(); err != nil {
				log.Println(err)
				return
			}
		case <-ticker.C:
			c.conn.SetWriteDeadline(time.Now().Add(writeWait))

			// Write message and immediately close
			if err := c.conn.WriteMessage(websocket.PingMessage, nil); err != nil {
				log.Println(err)
				return
			}
		}
	}
}
