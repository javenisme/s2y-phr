#!/bin/bash

# Load environment variables safely
set -a
source .env
set +a

# Start Medplum server with environment configuration
cd packages/server
npx ts-node-dev --poll --respawn --transpile-only --require ./src/otel/instrumentation.ts src/index.ts env: