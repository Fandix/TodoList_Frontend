# Docker Deployment

## Prerequisites

- Docker
- Docker Compose

## Quick Start

```bash
# Build and run
docker-compose up --build

# Run in background
docker-compose up -d --build
```

Application will be available at: http://localhost:3001

## Commands

```bash
# Stop containers
docker-compose down

# View logs
docker-compose logs -f

# Rebuild without cache
docker-compose build --no-cache
```

## Architecture

- **Build stage**: Node.js 18 Alpine - compiles React application
- **Production stage**: Nginx Alpine - serves static files

## Port Configuration

| Service | Internal Port | External Port |
|---------|---------------|---------------|
| Frontend | 3001 | 3001 |
