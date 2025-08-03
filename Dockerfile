# Multi-stage Dockerfile for inkathon
# syntax=docker/dockerfile:1

# Base image: Alpine Linux with Bun runtime and Node.js 22
# Alpine chosen for smaller image size and security benefits
FROM imbios/bun-node:latest-22-alpine AS base

# Install bash (required for build scripts)
RUN apk add --no-cache bash

# ===============================================
# STAGE 1: Dependencies Installation
# Only rebuild this layer when package files change
# ===============================================
FROM base AS deps
WORKDIR /app

# Note: libc6-compat may be needed for some Node.js packages on Alpine
# Uncomment the line below if you encounter compatibility issues
# See: https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine
# RUN apk add --no-cache libc6-compat 

# Copy all files
COPY . .

# Install dependencies with frozen lockfiles to ensure reproducible builds
# Automatically detect and use the appropriate package manager
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  elif [ -f bun.lockb ]; then bun install; \
  elif [ -f bun.lock ]; then bun install; \
  else echo "Lockfile not found." && exit 1; \
  fi

# ===============================================
# STAGE 2: Application Builder
# Build the Next.js application with optimizations
# ===============================================
FROM base AS builder
WORKDIR /app

# Copy everything from the deps stage
COPY --from=deps /app .

# Disable Next.js telemetry for privacy and faster builds
ENV NEXT_TELEMETRY_DISABLED=1

# Build the application using the standalone output feature
# This creates a minimal production bundle for optimal performance
RUN \
  if [ -f yarn.lock ]; then yarn run build:standalone; \
  elif [ -f package-lock.json ]; then npm run build:standalone; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build:standalone; \
  elif [ -f bun.lockb ]; then bun run build:standalone; \
  elif [ -f bun.lock ]; then bun run build:standalone; \
  else echo "Lockfile not found." && exit 1; \
  fi


# ===============================================
# STAGE 3: Production Runtime
# Minimal production image with only necessary files
# ===============================================
FROM base AS runner
WORKDIR /app

# Install curl for health checks (required for deployment platforms like Coolify)
# Update package index and install curl without caching to minimize image size
RUN apk update && apk add --no-cache curl

# Copy static assets from the builder stage
COPY --from=builder /app/frontend/public ./frontend/public

# Create system user and group for security best practices
# Use specific UIDs to avoid conflicts and ensure consistency across environments
RUN addgroup --system --gid 7294 nodejs \
  && adduser --system --uid 7294 nextjs \
  && mkdir -p frontend/.next \
  && chown nextjs:nodejs frontend/.next

# Copy the standalone Next.js build output with proper ownership
# Standalone output includes only necessary files, reducing image size significantly
# See: https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/frontend/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/frontend/.next/static ./frontend/.next/static

# Switch to non-root user for security
USER nextjs

# Environment variables for production configuration
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000

# Expose the port that the application will run on
EXPOSE 3000

# Start the Next.js server using the standalone build executable
CMD ["node", "frontend/server.js"]
