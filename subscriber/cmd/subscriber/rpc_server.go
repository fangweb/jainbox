package main

import (
	"context"
	"log"
	"net"

	"google.golang.org/grpc"
	pb "subscriber/proto"
)

type rpcServer struct {
	clientPool *ClientPool
}

func (s *rpcServer) Notify(ctx context.Context, in *pb.NotifyMessage) (*pb.NotifyResponse, error) {
	// TODO: notify error channel
	s.clientPool.notify <- &Message{Username: in.Username, Payload: &Payload{Type: in.Type, Notification: in.Notification}}
	return &pb.NotifyResponse{Notified: true}, nil
}

func listenRpc(clientPool *ClientPool, port string) {
	lis, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	pb.RegisterMessengerServer(s, &rpcServer{clientPool: clientPool})
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
