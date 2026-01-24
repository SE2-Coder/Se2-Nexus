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
    router.HandleMethodNotAllowed = true // Return 405 instead of 404 for wrong method

	// Debug Route
	router.GET("/api/debug-routes", func(c *gin.Context) {
		routes := router.Routes()
		c.JSON(200, routes)
	})

    // Catch-all 404 Debugger
    router.NoRoute(func(c *gin.Context) {
        c.JSON(404, gin.H{"error": "route not found", "path_received": c.Request.URL.Path, "method": c.Request.Method})
    })

    // CORS Configuration
	router.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*") // For production, restrict this to specific domains
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	})

	router.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "up", "version": "v2-auth-real"})
	})

	api := router.Group("/api")
	{
		api.POST("/register", authHandler.Register)
		api.POST("/login", authHandler.Login)
	}

	log.Printf("Starting server on port %s", port)
	router.Run(":" + port)
}
