# Create a new stage named 'deps' based on the 'base' stage
FROM node:18-alpine AS deps

# Install libc6-compat to ensure compatibility with Alpine Linux
RUN apk add --no-cache libc6-compat

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json (if exists) to the working directory
COPY package.json package-lock.json* ./

# Install dependencies using npm ci (clean install)
RUN npm ci

# Copy all files from the current directory to the working directory
COPY . .

# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED=1

# Set NODE_ENV to production for build
ENV NODE_ENV=production

# Add public environment variables needed for build
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YWRhcHRpbmctbWlubm93LTYuY2xlcmsuYWNjb3VudHMuZGV2JA
ENV NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
ENV NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
ENV NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
ENV NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
ENV NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID=9e30f943-c27d-4370-9058-69dbc1a8de76
ENV NEXT_PUBLIC_VAPI_API_KEY=3e73cb53-d2ee-477f-928e-09415b859fd8

# Build the Next.js application
RUN npm run build

# Create a new stage named 'runner' based on the 'base' stage
FROM node:18-alpine AS runner

# Set the working directory to /app
WORKDIR /app

# Set NODE_ENV to production
ENV NODE_ENV=production

# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED=1

# Create a system group named 'nodejs' with GID 1001
RUN addgroup --system --gid 1001 nodejs

# Create a system user named 'nextjs' with UID 1001
RUN adduser --system --uid 1001 nextjs

# Copy the public directory from the 'builder' stage
COPY --from=deps /app/public ./public

# Copy the .next directory from the 'builder' stage and set ownership to nextjs:nodejs
COPY --from=deps --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=deps --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy package.json from the 'builder' stage
COPY --from=deps /app/package.json ./package.json

# Switch to the 'nextjs' user
USER nextjs

# Expose port dynamically (Cloud Run will set PORT environment variable)
EXPOSE 3000

# Set the default PORT environment variable (Cloud Run can override this)
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Set the default command to start the Next.js application
CMD ["node", "server.js"]