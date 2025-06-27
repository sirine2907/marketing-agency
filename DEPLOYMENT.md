# OVH Hosting Deployment Guide

This guide covers different methods to deploy your Next.js landing page to OVH hosting services.

## ⚠️ Important: Asset Loading Fix for Shared Hosting

If you're getting 404 errors for CSS/JS files after deployment, follow these steps:

### Method 1: OVH Shared Hosting (Mutualisé) - RECOMMENDED

### Prerequisites
- OVH shared hosting account
- FTP access credentials
- FileZilla or similar FTP client

### Step 1: Build and Export Static Files

```bash
# Build the project for production
yarn deploy
```

### Step 2: Fix Asset Paths (CRITICAL FOR OVH)

After building, you need to modify the generated HTML file to work with shared hosting:

1. Open `out/index.html` in a text editor
2. Find all instances of `/_next/` and replace with `./_next/`
3. Save the file

**For Windows PowerShell (automated fix):**
```powershell
# Navigate to your project folder
cd D:\1_NEXT_JS_APPs\landing_page

# Fix asset paths automatically
(Get-Content "out\index.html") -replace '/_next/', './_next/' | Set-Content "out\index.html"
```

**For other systems:**
```bash
# Linux/Mac
sed -i 's|/_next/|./_next/|g' out/index.html
```

### Step 3: Upload Files via FTP

1. Connect to your OVH hosting via FTP:
   - **Host:** `ftp.your-domain.com` or `ftp.cluster0XX.hosting.ovh.net`
   - **Username:** Your OVH FTP username
   - **Password:** Your OVH FTP password
   - **Port:** 21

2. Navigate to the `www` folder (or your domain's root folder)

3. Upload ALL contents from the `out` folder to your domain's root directory:
   - `index.html` (the modified one)
   - `_next/` folder (contains all assets)
   - `404.html`
   - All other files (favicon.ico, etc.)

### Step 4: Domain Configuration

1. In your OVH control panel, ensure your domain points to the `www` folder
2. If using a subdomain, create it in the OVH control panel first

### Alternative: Create Automated Fix Script

Create a PowerShell script `fix-and-deploy.ps1`:

```powershell
# Build the project
yarn deploy

# Fix asset paths
Write-Host "Fixing asset paths for shared hosting..."
(Get-Content "out\index.html") -replace '/_next/', './_next/' | Set-Content "out\index.html"

# Fix 404 page if it exists
if (Test-Path "out\404\index.html") {
    (Get-Content "out\404\index.html") -replace '/_next/', './_next/' | Set-Content "out\404\index.html"
}

Write-Host "Files ready for upload! Upload the 'out' folder contents to your OVH hosting."
```

Run it with: `powershell -ExecutionPolicy Bypass -File fix-and-deploy.ps1`

## Method 2: OVH VPS (Full Next.js App)

### Prerequisites
- OVH VPS with root access
- Node.js 18+ installed
- PM2 or similar process manager

### Step 1: Server Setup

```bash
# Connect to your VPS
ssh root@your-vps-ip

# Update system
apt update && apt upgrade -y

# Install Node.js (if not installed)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# Install PM2 globally
npm install -g pm2

# Install nginx (optional, for reverse proxy)
apt install nginx -y
```

### Step 2: Deploy Application

```bash
# Clone or upload your project
git clone your-repo-url
cd landing_page

# Install dependencies
yarn install

# Build the project (regular build, not export)
yarn build

# Start with PM2
pm2 start npm --name "landing-page" -- start
pm2 save
pm2 startup
```

### Step 3: Nginx Configuration (Optional)

Create `/etc/nginx/sites-available/landing-page`:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable the site
ln -s /etc/nginx/sites-available/landing-page /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

## Method 3: OVH Web Cloud (Docker)

### Prerequisites
- OVH Web Cloud account
- Docker knowledge

### Step 1: Create Dockerfile

```dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

### Step 2: Build and Deploy

```bash
# Build Docker image
docker build -t landing-page .

# Deploy to OVH Web Cloud
# Follow OVH Web Cloud documentation for container deployment
```

## Quick Deployment Commands

### For Shared Hosting (with fix):
```bash
# Windows
yarn deploy
powershell -Command "(Get-Content 'out\index.html') -replace '/_next/', './_next/' | Set-Content 'out\index.html'"

# Linux/Mac
yarn deploy
sed -i 's|/_next/|./_next/|g' out/index.html
```

### For VPS:
```bash
yarn build
yarn start
```

## Troubleshooting

### Common Issues:

1. **404 errors for CSS/JS files**: 
   - ✅ **SOLUTION**: Follow the asset path fix in Step 2 above
   - Make sure you've modified the HTML files to use relative paths

2. **Images not loading**: 
   - Ensure `images.unoptimized: true` is set in next.config.ts
   - Check that image files are uploaded correctly

3. **Styling issues**: 
   - Verify CSS files are properly uploaded and accessible
   - Check that the `_next/static/css/` folder exists on your server

4. **Page not found errors**: 
   - Ensure `index.html` is in the root directory of your domain
   - Check that your domain points to the correct folder

### Support Resources:
- OVH Documentation: https://docs.ovh.com/
- Next.js Deployment: https://nextjs.org/docs/deployment

## Environment Variables

If your app uses environment variables, create a `.env.local` file:

```bash
# For production, set these in your hosting environment
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Performance Optimization

1. Enable Gzip compression in your hosting panel
2. Set up CDN if available in your OVH plan
3. Configure caching headers for static assets

## Checklist for Successful Deployment

- [ ] Build completed successfully (`yarn deploy`)
- [ ] Fixed asset paths in HTML files (`/_next/` → `./_next/`)
- [ ] Uploaded all files from `out` folder to domain root
- [ ] Verified `index.html` is in the correct location
- [ ] Checked that `_next` folder exists and contains assets
- [ ] Tested the website in a browser

---

Choose the method that best fits your OVH hosting plan and technical requirements. 