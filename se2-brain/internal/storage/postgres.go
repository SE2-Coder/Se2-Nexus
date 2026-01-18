package storage

import (
	"context"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
)

type PostgresStorage struct {
	pool *pgxpool.Pool
}

func NewPostgresStorage(ctx context.Context) (*PostgresStorage, error) {
	pool, err := pgxpool.New(ctx, os.Getenv("DATABASE_URL"))
	if err != nil {
		return nil, err
	}
	return &PostgresStorage{pool: pool}, nil
}

func (s *PostgresStorage) CreateUser(user *User) error {
	_, err := s.pool.Exec(context.Background(), "INSERT INTO users (id, email, password_hash) VALUES ($1, $2, $3)", user.ID, user.Email, user.PasswordHash)
	return err
}

func (s *PostgresStorage) GetUserByEmail(email string) (*User, error) {
	u := &User{}
	err := s.pool.QueryRow(context.Background(), "SELECT id, email, password_hash FROM users WHERE email = $1", email).Scan(&u.ID, &u.Email, &u.PasswordHash)
	return u, err
}

func (s *PostgresStorage) UpdateUser(user *User) error {
	return nil
}
