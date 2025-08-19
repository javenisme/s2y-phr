# Medplum Vercel Deployment Guide

## Overview
This guide explains how to deploy Medplum with Supabase backend to Vercel.

## Architecture
- **Frontend**: Deployed to Vercel (SPA React app)
- **Backend**: Deployed to Vercel (Node.js server) 
- **Database**: Supabase PostgreSQL (cloud-hosted)
- **Redis**: Cloud Redis (Upstash recommended for production)

## Prerequisites

1. **Supabase Project**: Already configured with database
2. **Vercel Account**: Sign up at vercel.com
3. **Cloud Redis**: For production (Upstash recommended)
4. **Domain** (optional): Custom domain for production

## Deployment Steps

### 1. Deploy Frontend to Vercel

```bash
# From packages/app directory
cd packages/app
npx vercel --prod
```

Configuration in `packages/app/vercel.json`:
- SPA routing handled with rewrites
- Static asset caching optimized
- Build command: `npm run build`
- Output directory: `dist`

### 2. Deploy Backend to Vercel

```bash
# From project root
npx vercel --prod
```

Configuration in `vercel.json`:
- TypeScript Node.js server
- All API routes handled
- Environment variables from Vercel secrets

### 3. Configure Environment Variables in Vercel

Set these environment variables in your Vercel project:

#### Database (Supabase)
```
MEDPLUM_DATABASE_HOST=aws-0-us-east-1.pooler.supabase.com
MEDPLUM_DATABASE_PORT=5432
MEDPLUM_DATABASE_DBNAME=postgres
MEDPLUM_DATABASE_USERNAME=postgres.nkuczuywgfuelgrkneql
MEDPLUM_DATABASE_PASSWORD=Sing2YHVH!777
MEDPLUM_DATABASE_SSL_REQUIRE=true
MEDPLUM_DATABASE_SSL_REJECT_UNAUTHORIZED=false
```

#### Redis (Production - use Upstash or similar)
```
MEDPLUM_REDIS_HOST=your-redis-host.upstash.io
MEDPLUM_REDIS_PORT=6379
MEDPLUM_REDIS_PASSWORD=your-redis-password
```

#### Application URLs
```
MEDPLUM_BASE_URL=https://your-backend.vercel.app/
MEDPLUM_APP_BASE_URL=https://your-frontend.vercel.app/
MEDPLUM_ALLOWED_ORIGINS=https://your-frontend.vercel.app
```

#### Security
```
MEDPLUM_SIGNING_KEY_ID=production-key-id
MEDPLUM_SIGNING_KEY_PASSPHRASE=production-secret-passphrase
MEDPLUM_ADMIN_CLIENT_ID=new-production-uuid
```

#### Storage (Production - use Vercel Blob or AWS S3)
```
MEDPLUM_BINARY_STORAGE=vercel-blob://
MEDPLUM_STORAGE_BASE_URL=https://your-backend.vercel.app/storage/
```

### 4. Verify Deployment

1. **Backend Health Check**: `https://your-backend.vercel.app/healthcheck`
2. **Frontend Access**: `https://your-frontend.vercel.app/`
3. **Database Connection**: Should show `"postgres": true` in health check

## Production Considerations

### Security
- [ ] Generate new signing keys for production
- [ ] Create new admin client ID (UUID)
- [ ] Restrict CORS to your domain only
- [ ] Use strong, unique passwords

### Performance
- [ ] Set up cloud Redis (Upstash recommended)
- [ ] Configure cloud storage (Vercel Blob or AWS S3)
- [ ] Enable CDN for static assets
- [ ] Monitor function execution times

### Monitoring
- [ ] Set up Vercel Analytics
- [ ] Configure error tracking (Sentry)
- [ ] Monitor database performance in Supabase
- [ ] Set up uptime monitoring

## Environment Variable Management

### Vercel CLI Commands
```bash
# Add environment variable
vercel env add MEDPLUM_DATABASE_HOST

# List environment variables  
vercel env ls

# Remove environment variable
vercel env rm MEDPLUM_DATABASE_HOST
```

### Using Vercel Secrets
```bash
# Create secret
vercel secrets add medplum-db-password "Sing2YHVH!777"

# Reference in vercel.json
"env": {
  "MEDPLUM_DATABASE_PASSWORD": "@medplum-db-password"
}
```

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check Supabase project is active
   - Verify connection string format
   - Ensure SSL settings match

2. **Frontend 404 Errors** 
   - Verify vercel.json rewrites configuration
   - Check build output directory

3. **Redis Connection Issues**
   - Ensure cloud Redis is properly configured
   - Check Redis host and credentials

4. **Environment Variables Not Loading**
   - Verify variable names match exactly
   - Check Vercel project settings
   - Redeploy after adding variables

## Files Created for Deployment

- `.env` - Updated with production variables
- `vercel.json` - Backend Vercel configuration
- `packages/app/vercel.json` - Frontend Vercel configuration  
- `packages/server/medplum.production.config.json` - Production config template
- `start-production.sh` - Production startup script
- `DEPLOYMENT.md` - This deployment guide

## Next Steps

1. Deploy frontend and backend to Vercel
2. Configure all environment variables
3. Test the deployment thoroughly
4. Set up monitoring and alerts
5. Configure custom domain (optional)