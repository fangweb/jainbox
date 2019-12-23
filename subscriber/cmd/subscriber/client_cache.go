package main

import (
	"time"

	"github.com/patrickmn/go-cache"
)

// ClientCache for managing client websocket connections
type ClientCache struct {
	store *cache.Cache
}

func (c *ClientCache) setClient(username string, client *Client) {
	c.store.Set(username, client, cache.DefaultExpiration)
}

func (c *ClientCache) getClient(username string) (*Client, bool) {
	if cached, found := c.store.Get(username); found {
		if client, ok := cached.(*Client); ok {
			return client, ok
		}
	}
	return nil, false
}

func (c *ClientCache) getAllClients() (map[string]*Client, bool) {
	items := c.store.Items()
	if len(items) == 0 {
		return nil, true
	}

	clients := make(map[string]*Client)
	for username, cached := range items {
		if client, ok := cached.Object.(*Client); ok {
			clients[username] = client
		}
	}

	return clients, false
}

func (c *ClientCache) delete(username string) {
	c.store.Delete(username)
}

// NewCache creates a new cache with predefined settings
func NewCache() *ClientCache {
	return &ClientCache{
		store: cache.New(24*time.Hour, 10*time.Minute),
	}
}
