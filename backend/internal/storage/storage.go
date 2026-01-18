package storage

import "errors"

// User represents the database model for a user
type User struct {
	ID           string
	Email        string
	PasswordHash string
	TOTPSecret   string
	Is2FAEnabled bool
}

// Storage defines the interface for data operations
type Storage interface {
	CreateUser(user *User) error
	GetUserByEmail(email string) (*User, error)
	UpdateUser(user *User) error
}

// MockStorage is a temporary in-memory storage for development
type MockStorage struct {
	users map[string]*User
}

func NewMockStorage() *MockStorage {
	return &MockStorage{users: make(map[string]*User)}
}

func (m *MockStorage) CreateUser(user *User) error {
	if _, ok := m.users[user.Email]; ok {
		return errors.New("user already exists")
	}
	m.users[user.Email] = user
	return nil
}

func (m *MockStorage) GetUserByEmail(email string) (*User, error) {
	user, ok := m.users[email]
	if !ok {
		return nil, errors.New("user not found")
	}
	return user, nil
}

func (m *MockStorage) UpdateUser(user *User) error {
	m.users[user.Email] = user
	return nil
}
