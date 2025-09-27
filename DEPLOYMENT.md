# 🚀 Cloud Run Deployment Guide

## Quick Deploy via Cloud Console (Recommended)

### Step 1: Connect GitHub Repository
1. Go to [Google Cloud Console → Cloud Run](https://console.cloud.google.com/run)
2. Click **"Create Service"** → **"Continuously deploy from a repository"**
3. Click **"Set up with Cloud Build"**
4. Select **GitHub** as source and authenticate
5. Choose your repository: `ANAMASGARD/CareerShot`
6. Select branch: `main`
7. Build type: **Dockerfile**
8. Service settings:
   - **Service name**: `careershot`
   - **Region**: `us-central1` (to use your existing URL)
   - **CPU allocation**: CPU is only allocated during request processing
   - **Memory**: 2 GiB
   - **CPU**: 2
   - **Maximum instances**: 10
   - **Minimum instances**: 0
   - **Allow unauthenticated invocations**: ✅ Yes

### Step 2: Set Environment Variables (After Deployment)
Run the provided script to set all runtime environment variables:

```bash
# Make the script executable
chmod +x set-env-vars.sh

# Run the script to set environment variables
./set-env-vars.sh
```

Or set them manually in Cloud Console:
1. Go to your Cloud Run service
2. Click **"Edit & Deploy New Revision"**
3. Go to **"Variables & Secrets"** tab
4. Add the environment variables from your `.env` file

## Manual Deploy via Cloud Build (Alternative)

```bash
# 1. Set project
gcloud config set project careershot

# 2. Enable required APIs
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud services enable containerregistry.googleapis.com

# 3. Submit build and deploy
gcloud builds submit --config cloudbuild.yaml

# 4. Set environment variables
./set-env-vars.sh
```

## Key Features of This Setup

✅ **Multi-stage Docker build** for optimized images  
✅ **Non-root user** for security  
✅ **Next.js standalone output** for minimal container size  
✅ **Build-time environment variables** for client-side values  
✅ **Runtime environment variables** for server-side secrets  
✅ **Cloud Build integration** for automatic deployments  
✅ **US-Central1 region** to maintain your existing URL  

## Environment Variables

### Build-time (Public - embedded in client bundle):
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL`
- `NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL`
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL`
- `NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL`
- `NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID`
- `NEXT_PUBLIC_VAPI_API_KEY`

### Runtime-only (Private - server-side only):
- `CLERK_SECRET_KEY`
- `VAPI_PRIVATE_KEY`
- `DATABASE_URL`
- `GOOGLE_GEMINI_API_KEY`
- `GOOGLE_APPLICATION_CREDENTIALS_JSON`

## Troubleshooting

### Build fails with missing publishable key
- Ensure `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is set in Dockerfile
- Check that the key is valid in your Clerk dashboard

### VAPI connection issues
- Verify `NEXT_PUBLIC_VAPI_API_KEY` is the **public** key (for web SDK)
- Verify `VAPI_PRIVATE_KEY` is the **private** key (for server operations)
- Confirm `NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID` matches your VAPI assistant

### Database connection issues
- Check DATABASE_URL format and credentials
- Ensure Neon database allows connections from Cloud Run IPs

## Security Best Practices

🔒 **Never commit secrets** to GitHub  
🔒 **Use Secret Manager** for production sensitive data  
🔒 **Public keys only** in build-time environment variables  
🔒 **Private keys only** in runtime environment variables  
🔒 **Enable audit logging** for Cloud Run deployments