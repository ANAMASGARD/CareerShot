# Cloud Run Deployment Guide - IMPROVED

## Fixed Issues from Previous Deployment

### 1. Environment Variables ✅
- Fixed NODE_ENV mismatch (now set to 'production')
- Added comprehensive health check endpoint

### 2. Dockerfile Optimization ✅
- Multi-stage build with separate builder stage
- Proper copying from builder stage instead of deps
- Added startup script with environment validation
- Added health check configuration
- Improved container startup time

### 3. Cloud Build Configuration ✅
- Set min-instances to 1 (prevents cold starts)
- Added CPU boost for faster startup
- Increased memory and CPU allocation
- Improved timeout settings

### 4. Health Check Implementation ✅
- Created `/api/health` endpoint
- Configured startup, liveness, and readiness probes
- Added environment variable validation

## Deployment Steps

### Method 1: Using Cloud Build (Recommended)
```bash
# Trigger the build from your repository
gcloud builds trigger run careershot-trigger --branch=main
```

### Method 2: Using the Deploy Script
```bash
chmod +x deploy.sh
./deploy.sh
```

### Method 3: Using the Service YAML
```bash
# Deploy using the service configuration
gcloud run services replace cloud-run-service.yaml --region=us-central1
```

## Key Improvements Made

### 🔧 Container Optimization
- Multi-stage Docker build reduces image size
- Proper user permissions (nextjs:nodejs)
- Health check integration
- Startup script with validation

### ⚡ Performance Enhancements
- CPU boost enabled for faster cold starts
- Min instances set to 1 to prevent cold starts
- Optimized memory (2Gi) and CPU (2 cores)
- Gen2 execution environment

### 🏥 Health Monitoring
- Startup probe: 30s initial delay, 30s timeout
- Liveness probe: checks every 10s
- Readiness probe: checks every 5s
- Custom health endpoint at `/api/health`

### 🔒 Security & Reliability
- Environment variable validation on startup
- Proper service account configuration
- Secure container user setup
- Timeout handling (900s)

## Environment Variables Required in Cloud Run

Ensure these are set in your Cloud Run service:

**Authentication:**
- CLERK_SECRET_KEY
- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
- NEXT_PUBLIC_CLERK_SIGN_IN_URL
- NEXT_PUBLIC_CLERK_SIGN_UP_URL
- NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL
- NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL

**Database:**
- DATABASE_URL

**AI Services:**
- GOOGLE_GEMINI_API_KEY
- NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID
- NEXT_PUBLIC_VAPI_API_KEY
- VAPI_PRIVATE_KEY

**Configuration:**
- NODE_ENV=production
- GCP_PROJECT_ID=careershot
- NEXT_TELEMETRY_DISABLED=1

## Troubleshooting

### If deployment still fails:

1. **Check build logs:**
```bash
gcloud logging read "resource.type=build" --limit=20 --format="table(timestamp,textPayload)"
```

2. **Check runtime logs:**
```bash
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=careershot" --limit=20
```

3. **Test health endpoint:**
```bash
curl -f https://YOUR-SERVICE-URL/api/health
```

4. **Monitor startup:**
```bash
gcloud run services describe careershot --region=us-central1
```

## Expected Results

After deployment, you should see:
- ✅ Build completes successfully
- ✅ Container starts within 60 seconds
- ✅ Health checks pass
- ✅ Service becomes ready
- ✅ Application responds correctly

The key improvements should resolve the "Resource readiness deadline exceeded" error by:
- Ensuring faster container startup
- Providing proper health check endpoints
- Maintaining warm instances
- Validating environment setup