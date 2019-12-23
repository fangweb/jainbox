// Code generated by protoc-gen-go. DO NOT EDIT.
// source: messenger.proto

package pb

import (
	context "context"
	fmt "fmt"
	proto "github.com/golang/protobuf/proto"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
	math "math"
)

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.ProtoPackageIsVersion3 // please upgrade the proto package

type NotifyMessage struct {
	Username             string   `protobuf:"bytes,1,opt,name=Username,proto3" json:"Username,omitempty"`
	Type                 string   `protobuf:"bytes,2,opt,name=Type,proto3" json:"Type,omitempty"`
	Notification         string   `protobuf:"bytes,3,opt,name=Notification,proto3" json:"Notification,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *NotifyMessage) Reset()         { *m = NotifyMessage{} }
func (m *NotifyMessage) String() string { return proto.CompactTextString(m) }
func (*NotifyMessage) ProtoMessage()    {}
func (*NotifyMessage) Descriptor() ([]byte, []int) {
	return fileDescriptor_b99aba0cbf4e4b91, []int{0}
}

func (m *NotifyMessage) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_NotifyMessage.Unmarshal(m, b)
}
func (m *NotifyMessage) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_NotifyMessage.Marshal(b, m, deterministic)
}
func (m *NotifyMessage) XXX_Merge(src proto.Message) {
	xxx_messageInfo_NotifyMessage.Merge(m, src)
}
func (m *NotifyMessage) XXX_Size() int {
	return xxx_messageInfo_NotifyMessage.Size(m)
}
func (m *NotifyMessage) XXX_DiscardUnknown() {
	xxx_messageInfo_NotifyMessage.DiscardUnknown(m)
}

var xxx_messageInfo_NotifyMessage proto.InternalMessageInfo

func (m *NotifyMessage) GetUsername() string {
	if m != nil {
		return m.Username
	}
	return ""
}

func (m *NotifyMessage) GetType() string {
	if m != nil {
		return m.Type
	}
	return ""
}

func (m *NotifyMessage) GetNotification() string {
	if m != nil {
		return m.Notification
	}
	return ""
}

type BroadcastMessage struct {
	Type                 string   `protobuf:"bytes,1,opt,name=Type,proto3" json:"Type,omitempty"`
	Notification         string   `protobuf:"bytes,2,opt,name=Notification,proto3" json:"Notification,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *BroadcastMessage) Reset()         { *m = BroadcastMessage{} }
func (m *BroadcastMessage) String() string { return proto.CompactTextString(m) }
func (*BroadcastMessage) ProtoMessage()    {}
func (*BroadcastMessage) Descriptor() ([]byte, []int) {
	return fileDescriptor_b99aba0cbf4e4b91, []int{1}
}

func (m *BroadcastMessage) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_BroadcastMessage.Unmarshal(m, b)
}
func (m *BroadcastMessage) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_BroadcastMessage.Marshal(b, m, deterministic)
}
func (m *BroadcastMessage) XXX_Merge(src proto.Message) {
	xxx_messageInfo_BroadcastMessage.Merge(m, src)
}
func (m *BroadcastMessage) XXX_Size() int {
	return xxx_messageInfo_BroadcastMessage.Size(m)
}
func (m *BroadcastMessage) XXX_DiscardUnknown() {
	xxx_messageInfo_BroadcastMessage.DiscardUnknown(m)
}

var xxx_messageInfo_BroadcastMessage proto.InternalMessageInfo

func (m *BroadcastMessage) GetType() string {
	if m != nil {
		return m.Type
	}
	return ""
}

func (m *BroadcastMessage) GetNotification() string {
	if m != nil {
		return m.Notification
	}
	return ""
}

type Response struct {
	Success              bool     `protobuf:"varint,1,opt,name=Success,proto3" json:"Success,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *Response) Reset()         { *m = Response{} }
func (m *Response) String() string { return proto.CompactTextString(m) }
func (*Response) ProtoMessage()    {}
func (*Response) Descriptor() ([]byte, []int) {
	return fileDescriptor_b99aba0cbf4e4b91, []int{2}
}

func (m *Response) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_Response.Unmarshal(m, b)
}
func (m *Response) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_Response.Marshal(b, m, deterministic)
}
func (m *Response) XXX_Merge(src proto.Message) {
	xxx_messageInfo_Response.Merge(m, src)
}
func (m *Response) XXX_Size() int {
	return xxx_messageInfo_Response.Size(m)
}
func (m *Response) XXX_DiscardUnknown() {
	xxx_messageInfo_Response.DiscardUnknown(m)
}

var xxx_messageInfo_Response proto.InternalMessageInfo

func (m *Response) GetSuccess() bool {
	if m != nil {
		return m.Success
	}
	return false
}

func init() {
	proto.RegisterType((*NotifyMessage)(nil), "pb.NotifyMessage")
	proto.RegisterType((*BroadcastMessage)(nil), "pb.BroadcastMessage")
	proto.RegisterType((*Response)(nil), "pb.Response")
}

func init() { proto.RegisterFile("messenger.proto", fileDescriptor_b99aba0cbf4e4b91) }

var fileDescriptor_b99aba0cbf4e4b91 = []byte{
	// 214 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0x7c, 0x90, 0xc1, 0x4a, 0xc6, 0x30,
	0x10, 0x84, 0x6d, 0x95, 0xdf, 0x76, 0xa9, 0xa8, 0x8b, 0x87, 0xd0, 0x93, 0x04, 0x0f, 0x82, 0x50,
	0x50, 0xdf, 0xc0, 0xa3, 0x50, 0x0f, 0x55, 0x1f, 0x20, 0x8d, 0x6b, 0x29, 0xd2, 0x24, 0x64, 0xe3,
	0xa1, 0x6f, 0x2f, 0x8d, 0xa4, 0xd0, 0x22, 0xde, 0x32, 0x33, 0xe4, 0xcb, 0x4c, 0xe0, 0x7c, 0x22,
	0x66, 0x32, 0x03, 0xf9, 0xc6, 0x79, 0x1b, 0x2c, 0xe6, 0xae, 0x97, 0x1a, 0xce, 0x5e, 0x6c, 0x18,
	0x3f, 0xe7, 0x96, 0x98, 0xd5, 0x40, 0x58, 0x43, 0xf1, 0xce, 0xe4, 0x8d, 0x9a, 0x48, 0x64, 0xd7,
	0xd9, 0x6d, 0xd9, 0xad, 0x1a, 0x11, 0x4e, 0xde, 0x66, 0x47, 0x22, 0x8f, 0x7e, 0x3c, 0xa3, 0x84,
	0x2a, 0x02, 0x46, 0xad, 0xc2, 0x68, 0x8d, 0x38, 0x8e, 0xd9, 0xc6, 0x93, 0xcf, 0x70, 0xf1, 0xe4,
	0xad, 0xfa, 0xd0, 0x8a, 0x43, 0x7a, 0x27, 0xb1, 0xb2, 0x7f, 0x58, 0xf9, 0x1f, 0xac, 0x1b, 0x28,
	0x3a, 0x62, 0x67, 0x0d, 0x13, 0x0a, 0x38, 0x7d, 0xfd, 0xd6, 0x9a, 0x98, 0x23, 0xa6, 0xe8, 0x92,
	0x7c, 0xf8, 0x82, 0xb2, 0x4d, 0x6b, 0xf1, 0x0e, 0x0e, 0xbf, 0x1b, 0xf1, 0xb2, 0x71, 0x7d, 0xb3,
	0xd9, 0x5b, 0x57, 0x8b, 0x95, 0x88, 0xf2, 0x08, 0xef, 0xa1, 0x5c, 0xbb, 0xe2, 0xd5, 0x12, 0xee,
	0xab, 0xef, 0xaf, 0xf4, 0x87, 0xf8, 0x9d, 0x8f, 0x3f, 0x01, 0x00, 0x00, 0xff, 0xff, 0xe7, 0x72,
	0x76, 0x86, 0x61, 0x01, 0x00, 0x00,
}

// Reference imports to suppress errors if they are not otherwise used.
var _ context.Context
var _ grpc.ClientConn

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
const _ = grpc.SupportPackageIsVersion4

// MessengerClient is the client API for Messenger service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://godoc.org/google.golang.org/grpc#ClientConn.NewStream.
type MessengerClient interface {
	Notify(ctx context.Context, in *NotifyMessage, opts ...grpc.CallOption) (*Response, error)
	Broadcast(ctx context.Context, in *BroadcastMessage, opts ...grpc.CallOption) (*Response, error)
}

type messengerClient struct {
	cc *grpc.ClientConn
}

func NewMessengerClient(cc *grpc.ClientConn) MessengerClient {
	return &messengerClient{cc}
}

func (c *messengerClient) Notify(ctx context.Context, in *NotifyMessage, opts ...grpc.CallOption) (*Response, error) {
	out := new(Response)
	err := c.cc.Invoke(ctx, "/pb.Messenger/Notify", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *messengerClient) Broadcast(ctx context.Context, in *BroadcastMessage, opts ...grpc.CallOption) (*Response, error) {
	out := new(Response)
	err := c.cc.Invoke(ctx, "/pb.Messenger/Broadcast", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// MessengerServer is the server API for Messenger service.
type MessengerServer interface {
	Notify(context.Context, *NotifyMessage) (*Response, error)
	Broadcast(context.Context, *BroadcastMessage) (*Response, error)
}

// UnimplementedMessengerServer can be embedded to have forward compatible implementations.
type UnimplementedMessengerServer struct {
}

func (*UnimplementedMessengerServer) Notify(ctx context.Context, req *NotifyMessage) (*Response, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Notify not implemented")
}
func (*UnimplementedMessengerServer) Broadcast(ctx context.Context, req *BroadcastMessage) (*Response, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Broadcast not implemented")
}

func RegisterMessengerServer(s *grpc.Server, srv MessengerServer) {
	s.RegisterService(&_Messenger_serviceDesc, srv)
}

func _Messenger_Notify_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(NotifyMessage)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(MessengerServer).Notify(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/pb.Messenger/Notify",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MessengerServer).Notify(ctx, req.(*NotifyMessage))
	}
	return interceptor(ctx, in, info, handler)
}

func _Messenger_Broadcast_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(BroadcastMessage)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(MessengerServer).Broadcast(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/pb.Messenger/Broadcast",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MessengerServer).Broadcast(ctx, req.(*BroadcastMessage))
	}
	return interceptor(ctx, in, info, handler)
}

var _Messenger_serviceDesc = grpc.ServiceDesc{
	ServiceName: "pb.Messenger",
	HandlerType: (*MessengerServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "Notify",
			Handler:    _Messenger_Notify_Handler,
		},
		{
			MethodName: "Broadcast",
			Handler:    _Messenger_Broadcast_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "messenger.proto",
}
