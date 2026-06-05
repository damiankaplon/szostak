FROM node:24-alpine AS builder

WORKDIR /app



# Copy only the files needed for installing dependencies

# This allows Docker to cache the 'npm ci' layer

COPY package*.json ./



# 'npm ci' is faster and more reliable for Docker builds than 'npm install'

RUN npm ci



# Copy the rest of your source code

COPY . .



# Build the Vite app (Vite outputs to 'dist/' by default)

RUN npm run build



# Stage 2: Production Nginx Server

FROM nginx:stable-alpine AS production



# Copy the static build files from the builder stage

COPY --from=builder /app/dist /usr/share/nginx/html



# Copy your Nginx configuration

COPY nginx.conf /etc/nginx/conf.d/default.conf



# Standard permissions for web files

RUN chmod -R 755 /usr/share/nginx/html



EXPOSE 80