# Build Stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json ./
# Install dependencies (only in the container)
RUN npm install
COPY . .
# Build the Astro site
RUN npm run build

# Serve Stage
FROM nginx:alpine
# Copy built static files to Nginx
COPY --from=builder /app/dist /usr/share/nginx/html
# Custom Nginx config if needed (optional, using default for now)
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
