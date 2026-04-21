# ---- Build Stage ----
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --only=production

# ---- Production Stage ----
FROM node:18-alpine

# Security: run as non-root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copy production dependencies from builder
COPY --from=builder /app/node_modules ./node_modules
COPY package.json package-lock.json ./
COPY src ./src

# Set ownership
RUN chown -R appuser:appgroup /app

USER appuser

# Cloud Run injects PORT env var (default 8080)
ENV NODE_ENV=production
EXPOSE 8080

# Cloud Run sends SIGTERM on shutdown — Node handles it in index.js
CMD ["npm", "start"]
