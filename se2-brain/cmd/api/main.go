package main

import (
	"context"
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"se2-backend/internal/auth"
	"se2-backend/internal/storage"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	ctx := context.Background()
	db, err := storage.NewPostgresStorage(ctx)
	if err != nil {
		log.Printf("Warning: DB connection failed: %v", err)
	}

	authHandler := auth.NewAuthHandler(db)
	router := gin.Default()

	router.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "up"})
	})

	api := router.Group("/api")
	{
		api.POST("/register", authHandler.Register)
		api.POST("/login", authHandler.Login)
	}

	log.Printf("Starting server on port %s", port)
	router.Run(":" + port)
}
