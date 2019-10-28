package main

import (
	"fmt"
	"os"
)

func main() {
	subscriberAddr := fmt.Sprintf(":%v", os.Getenv("SUBSCRIBER_SERVER_PORT"))
	rpcAddr := fmt.Sprintf(":%v", os.Getenv("SUBSCRIBER_GRPC_PORT"))
	key := []byte(os.Getenv("API_JWT_SECRET"))

	authentication := &Authentication{key: key}

	clientPool := newClientPool()
	go clientPool.run()

	go listenRpc(clientPool, rpcAddr)

	server := Server{authentication: authentication, clientPool: clientPool, addr: subscriberAddr}
	server.run()
}
