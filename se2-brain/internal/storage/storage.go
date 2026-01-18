package storage

import "errors"

type User struct {
	ID           string
	Email        string
	PasswordHash string
	TOTPSecret   string
	Is2FAEnabled bool
}

type Storage interface {
	CreateUser(user *User) error
	GetUserByEmail(email string) (*User, error)
	UpdateUser(user *User) error
}
