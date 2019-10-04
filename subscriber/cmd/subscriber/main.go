package main

import (
	"os"
	"fmt"
)

func main() {
	rpcAddr := fmt.Sprintf(":%v", os.Getenv("GRPC_PORT"))
	subscriberAddr := fmt.Sprintf(":%v", os.Getenv("SUBSCRIBER_PORT"))
	key := []byte(os.Getenv("KEY"))
	
	authentication := &Authentication{key: key}

	clientPool := newClientPool()
	go clientPool.run()

	go listenRpc(clientPool, rpcAddr)

	server := Server{authentication: authentication, clientPool: clientPool, addr: subscriberAddr}
	server.run()
}
