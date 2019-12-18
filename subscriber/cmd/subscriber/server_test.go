package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/url"
	"os"
	"reflect"
	"sync"
	"testing"
	"time"

	"github.com/gorilla/websocket"
	"google.golang.org/grpc"
	pb "subscriber/proto"
)

func TestWs(t *testing.T) {
	var wg sync.WaitGroup
	var header http.Header
	header = make(http.Header)
	tokenStr := "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNlcnZpY2VVc2VyIiwidXNlcm5hbWVfaWQiOjQsImlhdCI6MTU2NTY1MzU5Nn0.pKigso89LxEVDGm1jZshv7d_UHqxYFlzhL-nd53m1kg"
	subscriberAddr := fmt.Sprintf(":%v", os.Getenv("SUBSCRIBER_SERVER_PORT"))
	rpcAddr := fmt.Sprintf(":%v", os.Getenv("SUBSCRIBER_GRPC_PORT"))

	authentication := &Authentication{key: []byte("jwtsecret12345a")}

	clientPool := newClientPool()
	go clientPool.run()

	go listenRpc(clientPool, rpcAddr)

	server := Server{authentication: authentication, clientPool: clientPool, addr: subscriberAddr}
	go server.run()

	u := url.URL{Scheme: "ws", Host: fmt.Sprintf("localhost:%v", os.Getenv("SUBSCRIBER_SERVER_PORT")), Path: "/ws"}

	credentials := url.QueryEscape(fmt.Sprintf("Bearer %s", tokenStr))
	cookieVal := fmt.Sprintf("X-Authorization=%s;", credentials)
	header.Add("Cookie", cookieVal)

	log.Printf("Dialing in 2s...")
	time.Sleep(2 * time.Second)

	// listener
	c, _, dialErr := websocket.DefaultDialer.Dial(u.String(), header)

	if dialErr != nil {
		log.Fatal("dial:", dialErr)
	}

	defer c.Close()

	wg.Add(1)
	go func() {
		defer wg.Done()
		_, notification, err := c.ReadMessage()

		if err != nil {
			t.Error("notification error:", err)
		} else {
			expected := Payload{Type: "any", Notification: "Hello world!!!!!"}
			recvPayload := &Payload{}
			json.Unmarshal(notification, recvPayload)
			log.Printf("Got payload: %+v", recvPayload)
			if reflect.DeepEqual(*recvPayload, expected) != true {
				t.Errorf("Expected value %+v, got %+v", expected, *recvPayload)
			}
		}
	}()

	// grpc dialer call
	rpcConn, rpcDialErr := grpc.Dial(rpcAddr, grpc.WithInsecure())
	if rpcDialErr != nil {
		log.Fatalf("did not connect: %v", rpcDialErr)
	}
	defer rpcConn.Close()
	rpcMessengerClient := pb.NewMessengerClient(rpcConn)

	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()
	notifyReply, notifyErr := rpcMessengerClient.Notify(ctx, &pb.NotifyMessage{Username: "serviceUser", Type: "any", Notification: "Hello world!!!!!"})
	if notifyErr != nil {
		log.Fatalf("could not notify: %+v", notifyErr)
	}
	log.Printf("Response: %+v", notifyReply)

	wg.Wait()
}
