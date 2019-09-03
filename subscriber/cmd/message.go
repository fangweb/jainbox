package main

// Message format
type Message struct {
	Username string
	*Payload
}

type Payload struct {
	Type         string
	Notification string
}
