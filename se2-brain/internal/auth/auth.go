package auth

import (
	"time"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

func HashPassword(p string) (string, error) {
	b, err := bcrypt.GenerateFromPassword([]byte(p), bcrypt.DefaultCost)
	return string(b), err
}

func CheckPasswordHash(p, h string) bool {
	return bcrypt.CompareHashAndPassword([]byte(h), []byte(p)) == nil
}

func GenerateToken(e string) (string, error) {
	t := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"email": e,
		"exp":   time.Now().Add(time.Hour * 24).Unix(),
	})
	return t.SignedString([]byte("secret"))
}
