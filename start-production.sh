#!/bin/bash

# Production startup script for Vercel deployment
# This script loads production environment variables and starts Medplum server

echo "Starting Medplum in production mode..."

# Set production environment
export NODE_ENV=production

# Load environment variables from .env file
if [ -f .env ]; then
  echo "Loading environment variables from .env file..."
  set -a
  source .env
  set +a
else
  echo "Warning: .env file not found. Using system environment variables only."
fi

# Override with production-specific values
export MEDPLUM_BASE_URL=${MEDPLUM_BASE_URL_PROD:-$MEDPLUM_BASE_URL}
export MEDPLUM_APP_BASE_URL=${MEDPLUM_APP_BASE_URL_PROD:-$MEDPLUM_APP_BASE_URL}
export MEDPLUM_PORT=${PORT:-${MEDPLUM_PORT_PROD:-3000}}
export MEDPLUM_REDIS_HOST=${MEDPLUM_REDIS_HOST_PROD:-$MEDPLUM_REDIS_HOST}
export MEDPLUM_REDIS_PORT=${MEDPLUM_REDIS_PORT_PROD:-$MEDPLUM_REDIS_PORT}
export MEDPLUM_REDIS_PASSWORD=${MEDPLUM_REDIS_PASSWORD_PROD:-$MEDPLUM_REDIS_PASSWORD}
export MEDPLUM_SIGNING_KEY_ID=${MEDPLUM_SIGNING_KEY_ID_PROD:-$MEDPLUM_SIGNING_KEY_ID}
export MEDPLUM_SIGNING_KEY_PASSPHRASE=${MEDPLUM_SIGNING_KEY_PASSPHRASE_PROD:-$MEDPLUM_SIGNING_KEY_PASSPHRASE}
export MEDPLUM_BINARY_STORAGE=${MEDPLUM_BINARY_STORAGE_PROD:-$MEDPLUM_BINARY_STORAGE}
export MEDPLUM_STORAGE_BASE_URL=${MEDPLUM_STORAGE_BASE_URL_PROD:-$MEDPLUM_STORAGE_BASE_URL}
export MEDPLUM_ALLOWED_ORIGINS=${MEDPLUM_ALLOWED_ORIGINS_PROD:-$MEDPLUM_ALLOWED_ORIGINS}
export MEDPLUM_ADMIN_CLIENT_ID=${MEDPLUM_ADMIN_CLIENT_ID_PROD:-$MEDPLUM_ADMIN_CLIENT_ID}

echo "Production configuration loaded:"
echo "- Port: $MEDPLUM_PORT"
echo "- Base URL: $MEDPLUM_BASE_URL"
echo "- App Base URL: $MEDPLUM_APP_BASE_URL"
echo "- Database Host: $MEDPLUM_DATABASE_HOST"
echo "- Redis Host: $MEDPLUM_REDIS_HOST"

# Start Medplum server with environment configuration
cd packages/server
echo "Starting Medplum server..."
npx ts-node-dev --poll --respawn --transpile-only --require ./src/otel/instrumentation.ts src/index.ts env: