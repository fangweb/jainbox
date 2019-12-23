package main

// User Message struct
type UserMessage struct {
	Username string
	*Payload
}

// Broadcast Message struct
type BroadcastMessage struct {
	*Payload
}

// Payload struct
type Payload struct {
	Type         string
	Notification string
}
