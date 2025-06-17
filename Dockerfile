# Use Node.js v22 Alpine for slim and secure base
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Copy only package files first (for better caching)
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy rest of the app
COPY . .

# Expose port
EXPOSE 5000

# Set production env
ENV NODE_ENV=production

# Start app
CMD ["node", "start"]
