package main

import (
	"fmt"
	"github.com/dgrijalva/jwt-go"
)

// Authentication for parsing jwt
type Authentication struct {
	key []byte
}

func (a *Authentication) parse(tokenString string) (jwt.MapClaims, bool) {

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}
		return a.key, nil
	})

	if err != nil {
		return nil, false
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		return claims, true
	} else {
		return nil, false
	}

}
