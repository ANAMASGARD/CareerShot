#!/bin/bash

# Google Cloud Run Deployment Script for CareerShot
# Make sure you have gcloud CLI installed and authenticated

# Configuration - CHANGE THESE VALUES
PROJECT_ID="careershot"  # Your Google Cloud Project ID
SERVICE_NAME="careershot"
REGION="us-central1"
IMAGE_NAME="gcr.io/$PROJECT_ID/$SERVICE_NAME"

echo "🚀 Starting deployment to Google Cloud Run..."
echo "Project: $PROJECT_ID"
echo "Service: $SERVICE_NAME"
echo "Region: $REGION"
echo ""

# Set the project
echo "📋 Setting Google Cloud project..."
gcloud config set project $PROJECT_ID

# Enable required APIs
echo "🔧 Enabling required APIs..."
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com

# Configure Docker to use gcloud as a credential helper
echo "🐳 Configuring Docker authentication..."
gcloud auth configure-docker

# Build the Docker image
echo "🔨 Building Docker image..."
docker build -t $IMAGE_NAME:latest .

if [ $? -ne 0 ]; then
    echo "❌ Docker build failed!"
    exit 1
fi

# Push the image to Google Container Registry
echo "📤 Pushing image to Google Container Registry..."
docker push $IMAGE_NAME:latest

if [ $? -ne 0 ]; then
    echo "❌ Docker push failed!"
    exit 1
fi

# Deploy to Cloud Run
echo "🚀 Deploying to Cloud Run..."
gcloud run deploy $SERVICE_NAME \
  --image $IMAGE_NAME:latest \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --port 3000 \
  --memory 2Gi \
  --cpu 1 \
  --max-instances 10 \
  --set-env-vars "NODE_ENV=production,NEXT_TELEMETRY_DISABLED=1"

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Deployment successful!"
    echo ""
    echo "Next steps:"
    echo "1. Go to Google Cloud Console: https://console.cloud.google.com/run"
    echo "2. Click on your '$SERVICE_NAME' service"
    echo "3. Click 'EDIT & DEPLOY NEW REVISION'"
    echo "4. Go to 'Variables & Secrets' tab"
    echo "5. Add your environment variables from env-variables-for-gcp.txt"
    echo ""
    echo "Your app will be available at the Cloud Run URL!"
else
    echo "❌ Deployment failed!"
    exit 1
fi