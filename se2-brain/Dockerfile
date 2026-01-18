FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY go.mod ./
COPY . .
RUN go build -o main ./cmd/api/main.go

FROM alpine:latest
WORKDIR /app
RUN apk add ca-certificates
COPY --from=builder /app/main .
EXPOSE 8080
CMD ["./main"]
