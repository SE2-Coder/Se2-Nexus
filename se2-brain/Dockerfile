# Build stage
FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY go.mod ./
RUN go mod download
COPY . .
RUN go build -o main ./cmd/api/main.go

# Production stage
FROM alpine:latest
WORKDIR /app
RUN apk add ca-certificates
COPY --from=builder /app/main .
EXPOSE 8080
CMD ["./main"]
