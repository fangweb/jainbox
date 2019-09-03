package main

import (
	"time"

	"github.com/patrickmn/go-cache"
)

// ClientCache for managing client websocket connections
type ClientCache struct {
	store *cache.Cache
}

func (c *ClientCache) set(username string, client *Client) {
	c.store.Set(username, client, cache.DefaultExpiration)
}

func (c *ClientCache) get(username string) (*Client, bool) {
	if cached, found := c.store.Get(username); found {
		if client, ok := cached.(*Client); ok {
			return client, ok
		}
	}
	return nil, false
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
