package main

import (
	"encoding/json"
	"log"
)

// ClientPool manages a set of connections using a cache
type ClientPool struct {
	notify chan *Message

	register chan *Client

	unregister chan *Client

	cache *ClientCache
}

func (c *ClientPool) run() {
	for {
		select {
		case client := <-c.register:
			c.cache.set(string(client.username), client)
		case client := <-c.unregister:
			if _, ok := c.cache.get(client.username); ok {
				c.cache.delete(client.username)

				// Close Client.writer goroutine
				close(client.write)
			} else {
				log.Printf("Could not unregister cache for user: %v\n", string(client.username))
			}
		case message := <-c.notify:
			if client, ok := c.cache.get(message.Username); ok {
				bytes, err := json.Marshal(message.Payload)
				if err != nil {
					log.Printf("Could not marshal payload: %v\n", err)
					return
				}
				client.write <- bytes
			} else {
				log.Printf("Could not find user from cache: %v\n", string(message.Username))
			}
		}
	}
}

func newClientPool() *ClientPool {
	return &ClientPool{
		notify:     make(chan *Message),
		register:   make(chan *Client),
		unregister: make(chan *Client),
		cache:      NewCache(),
	}
}
