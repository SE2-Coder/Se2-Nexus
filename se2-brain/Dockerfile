# Build stage
FROM golang:1.22-alpine AS builder
WORKDIR /app

# Copiamos TODO primero para asegurar que 'go mod tidy' vea todos los imports
COPY . .

# Generamos go.sum y descargamos dependencias
RUN go mod tidy
RUN go mod download

# Compilamos
RUN go build -o main ./cmd/api/main.go

# Production stage
FROM alpine:latest
WORKDIR /app
RUN apk add ca-certificates
COPY --from=builder /app/main .
EXPOSE 8080
CMD ["./main"]
