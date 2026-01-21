package auth

import (
	"se2-backend/internal/storage"

	"github.com/gin-gonic/gin"
)

type AuthHandler struct {
	store storage.Storage
}

func NewAuthHandler(s storage.Storage) *AuthHandler {
	return &AuthHandler{store: s}
}

func (h *AuthHandler) Register(c *gin.Context) {
	var req struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	c.BindJSON(&req)
	h.store.CreateUser(&storage.User{Email: req.Email, PasswordHash: req.Email}) // Simplified for brevity
	c.Status(201)
}

func (h *AuthHandler) Login(c *gin.Context) {
	c.JSON(200, gin.H{"token": "mock-token"})
}
