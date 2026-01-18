# Build stage
FROM golang:1.22-alpine AS builder

WORKDIR /app

# Copy go.mod and go.sum (if exists)
COPY go.mod ./
# RUN go mod download # Skipped because we manually managed deps for now

COPY . .

# Build the application
RUN go build -o main ./cmd/api/main.go

# Production stage
FROM alpine:latest

WORKDIR /app

# Install certificates for HTTPS requests
RUN apk --no-cache add ca-certificates

# Copy the binary from the builder stage
COPY --from=builder /app/main .

EXPOSE 8080

CMD ["./main"]
