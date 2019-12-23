package main

import (
	"encoding/json"
	"log"
)

// ClientPool manages a set of connections using a cache
type ClientPool struct {
	register chan *Client

	unregister chan *Client

	notify chan *UserMessage

	broadcast chan *BroadcastMessage

	cache *ClientCache
}

func (c *ClientPool) run() {
	for {
		select {
		case client := <-c.register:
			log.Printf("User %v has registered to client pool.\n", string(client.username))
			c.cache.setClient(string(client.username), client)
		case client := <-c.unregister:
			if _, ok := c.cache.getClient(client.username); ok {
				log.Printf("User %v has unregistered to client pool.\n", string(client.username))
				c.cache.delete(client.username)
			} else {
				log.Printf("Could not unregister cache for user %v in client pool.\n", string(client.username))
			}
		case userMessage := <-c.notify:
			if client, ok := c.cache.getClient(userMessage.Username); ok {
				bytes, err := json.Marshal(userMessage.Payload)
				if err != nil {
					log.Printf("Could not marshal payload: %v\n", err)
					return
				}
				client.write <- bytes
			} else {
				log.Printf("Could not find user %v from cache in client pool.\n", string(userMessage.Username))
			}
		case broadcastMessage := <-c.broadcast:
			if clients, isEmpty := c.cache.getAllClients(); !isEmpty {
				bytes, err := json.Marshal(broadcastMessage.Payload)
				if err != nil {
					log.Printf("Could not marshal payload: %v\n", err)
					return
				}

				for _, client := range clients {
					client.write <- bytes
				}
			} else {
				log.Printf("No clients to broadcast to.\n")
			}
		}
	}
}

func newClientPool() *ClientPool {
	return &ClientPool{
		register:   make(chan *Client),
		unregister: make(chan *Client),
		notify:     make(chan *UserMessage),
		broadcast:  make(chan *BroadcastMessage),
		cache:      NewCache(),
	}
}
