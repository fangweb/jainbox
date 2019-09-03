package main

import (
	"os"
	"fmt"
)

func main() {
	addr := os.Getenv("ADDR")
	key := []byte(os.Getenv("KEY"))
	fmt.Println(addr, key)
	//authentication := &Authentication{key: key}

}
