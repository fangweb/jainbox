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

func (s *rpcServer) Notify(ctx context.Context, in *pb.NotifyMessage) (*pb.Response, error) {
	// TODO: notify error channel
	s.clientPool.notify <- &UserMessage{Username: in.Username, Payload: &Payload{Type: in.Type, Notification: in.Notification}}
	return &pb.Response{Success: true}, nil
}

func (s *rpcServer) Broadcast(ctx context.Context, in *pb.BroadcastMessage) (*pb.Response, error) {
	// TODO: broadcast error channel
	s.clientPool.broadcast <- &BroadcastMessage{&Payload{Type: in.Type, Notification: in.Notification}}
	return &pb.Response{Success: true}, nil
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
