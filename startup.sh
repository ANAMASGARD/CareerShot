#!/bin/sh

# Startup optimization script for Cloud Run
echo "🚀 Starting CareerShot application..."
echo "NODE_ENV: $NODE_ENV"
echo "Starting Next.js server..."

# Start the Next.js application
exec node server.js