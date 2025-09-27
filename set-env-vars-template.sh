#!/bin/bash

# Template for setting environment variables on Google Cloud Run
# NEVER put real secrets in git - this is just a template!

echo "Setting environment variables for CareerShot on Cloud Run..."

# Replace YOUR_SERVICE_NAME with your actual Cloud Run service name
SERVICE_NAME="careershot"
REGION="us-central1"

# IMPORTANT: Replace all placeholder values with your REAL values
# Get these from your respective service dashboards AFTER regenerating them

gcloud run services update $SERVICE_NAME \
  --region=$REGION \
  --set-env-vars="
    DATABASE_URL=postgresql://USERNAME:PASSWORD@HOST/DATABASE?sslmode=require,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_REPLACE_WITH_REAL_KEY,
    CLERK_SECRET_KEY=sk_test_REPLACE_WITH_REAL_KEY,
    CLERK_WEBHOOK_SECRET=whsec_REPLACE_WITH_REAL_SECRET,
    VAPI_PRIVATE_KEY=REPLACE_WITH_REAL_VAPI_PRIVATE_KEY,
    GOOGLE_GENERATIVE_AI_API_KEY=REPLACE_WITH_REAL_GEMINI_KEY,
    NODE_ENV=production
  "

echo "Environment variables updated!"
echo ""
echo "⚠️  IMPORTANT: Make sure you've replaced ALL placeholder values with real credentials!"
echo "⚠️  NEVER commit files with real secrets to git!"