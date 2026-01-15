# 🚀 Deployment Guide - Aarvi's Gallery

Complete guide to deploy your photo gallery to production using Vercel.

## Quick Deploy to Vercel (Recommended)

### Option 1: Deploy via GitHub (Best)

1. **Initialize Git Repository**
   ```bash
   cd /path/to/AarviVSInsight
   git init
   git add .
   git commit -m "Initial commit: Photo gallery setup"
   ```

2. **Create GitHub Repository**
   - Go to [github.com/new](https://github.com/new)
   - Create new repository (e.g., `aarvi-gallery`)
   - Copy the commands and push your code:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/aarvi-gallery.git
   git branch -M main
   git push -u origin main
   ```

3. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Select your GitHub repository
   - Click "Import"
   - Click "Deploy"
   - Your site is now live! 🎉

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   cd /path/to/AarviVSInsight
   vercel
   ```

3. **Follow the prompts**
   - Confirm project name
   - Confirm deployment settings
   - Site will be live immediately

## Custom Domain Setup

### Add Custom Domain on Vercel

1. **In Vercel Dashboard**
   - Click your project
   - Go to "Settings" → "Domains"
   - Click "Add"

2. **Enter Your Domain**
   - Type your custom domain (e.g., `aarvi-gallery.com`)
   - Choose "Add Domain"

3. **Update DNS Records**
   - Copy the DNS records from Vercel
   - Go to your domain registrar (GoDaddy, Namecheap, etc.)
   - Update DNS settings with Vercel records
   - Wait 24-48 hours for DNS propagation

### Setup SSL Certificate
- Vercel automatically provides free SSL via Let's Encrypt
- HTTPS enabled automatically after DNS setup

## Environment Setup for Production

### Create `.env.production` (Optional)

```bash
# For future API integration
VITE_API_URL=https://api.yourdomain.com
VITE_ANALYTICS_ID=your-google-analytics-id
```

### Build Optimization

```bash
# Build with optimizations
npm run build

# Test production build locally
npm run preview
```

## Pre-Deployment Checklist

- [ ] All photos added to `public/images/gallery/`
- [ ] `src/data/photos.json` updated with all photo metadata
- [ ] Hero section text updated in `src/components/sections/HeroSection.tsx`
- [ ] Header branding updated in `src/components/layout/Header.tsx`
- [ ] Footer customized in `src/components/layout/Footer.tsx`
- [ ] `tailwind.config.js` colors match your brand
- [ ] Categories defined in `src/components/gallery/FilterBar.tsx`
- [ ] Site title updated in `index.html`
- [ ] Favicon added to `public/favicon.ico`
- [ ] Meta description set in `index.html`
- [ ] Production build tested locally with `npm run preview`
- [ ] All photos optimized (see image optimization guide below)

## Image Optimization Guide

### Recommended Image Specifications

| Use Case | Format | Quality | Size |
|----------|--------|---------|------|
| Gallery Display | JPEG | 80% | 800-1200px width |
| Thumbnail | JPEG/WebP | 80% | 300x300px |
| Hero Section | JPEG | 85% | 1920x1080px |

### Batch Optimization with ImageMagick

```bash
# Install ImageMagick (macOS)
brew install imagemagick

# Compress all JPEGs to 80% quality
mogrify -quality 80 -format jpg *.png

# Resize images to max 1200px width
mogrify -resize 1200x -format jpg *.jpg

# Create thumbnails
for file in *.jpg; do
  convert "$file" -resize 300x300 -gravity center -extent 300x300 "thumb_$file"
done
```

### Using Online Tools

1. **TinyPNG/TinyJPG**
   - Visit [tinypng.com](https://tinypng.com)
   - Upload images in bulk
   - Download compressed versions

2. **ImageOptim (macOS)**
   - Download from [imageoptim.com](https://imageoptim.com)
   - Drag and drop images to optimize

3. **Squoosh (Web)**
   - Visit [squoosh.app](https://squoosh.app)
   - Upload, compress, download

## Monitor Performance

### Check Lighthouse Score

1. **In Development**
   ```bash
   npm run build
   npm run preview
   ```

2. **In Browser**
   - Open DevTools (F12)
   - Go to "Lighthouse" tab
   - Click "Analyze page load"

3. **Target Scores**
   - Performance: 90+
   - Accessibility: 90+
   - Best Practices: 85+
   - SEO: 90+

### Monitor with Vercel Analytics

1. **Enable Analytics**
   - In Vercel Dashboard
   - Go to "Analytics"
   - Click "Enable"

2. **View Metrics**
   - Page load times
   - Core Web Vitals
   - User geography
   - Browser usage

## Setup Custom Analytics (Optional)

### Google Analytics Setup

1. **Create Google Analytics Account**
   - Go to [analytics.google.com](https://analytics.google.com)
   - Click "Start measuring"
   - Setup new property

2. **Get Measurement ID**
   - Copy your Measurement ID (G-XXXXXXXXXX)

3. **Add to Project**
   - Create `src/utils/analytics.ts`:
   ```typescript
   export const initAnalytics = () => {
     const script = document.createElement('script');
     script.src = `https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`;
     script.async = true;
     document.head.appendChild(script);
     
     window.dataLayer = window.dataLayer || [];
     function gtag() {
       (window as any).dataLayer.push(arguments);
     }
     (window as any).gtag = gtag;
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   };
   ```

   - Import in `src/main.tsx`:
   ```tsx
   import { initAnalytics } from './utils/analytics';
   initAnalytics();
   ```

## Troubleshooting Deployment

### Build Fails on Vercel

**Solution 1: Check Build Logs**
- In Vercel Dashboard, click "Deployments"
- Check logs for error messages
- Most common: Missing environment variables or dependencies

**Solution 2: Clear Cache**
```bash
vercel env pull  # Pull environment variables
vercel deploy --prod --skip-build  # Deploy without rebuilding
```

### Images Not Loading on Production

**Check:**
1. Image paths are absolute: `/images/gallery/photo.jpg`
2. Files exist in `public/images/gallery/`
3. File names match in `photos.json` exactly (case-sensitive on Linux)

**Fix:**
```bash
# Verify files exist
ls -la public/images/gallery/

# Check file names match photos.json
cat src/data/photos.json | grep "src"
```

### Site Too Slow

**Optimize Images:**
```bash
# Reduce image quality
mogrify -quality 70 public/images/gallery/*.jpg

# Compress more aggressively
mogrify -resize 1000x public/images/gallery/*.jpg
```

### Domain Not Resolving

1. **Wait 24-48 hours** for DNS propagation
2. **Check DNS Records:**
   ```bash
   nslookup yourdomain.com
   ```
3. **Verify in Vercel Dashboard** that domain shows "Valid"

## Post-Deployment Checklist

- [ ] Visit your live site in browser
- [ ] Test all photos load correctly
- [ ] Test infinite scroll (scroll to bottom)
- [ ] Test category filters
- [ ] Test search functionality
- [ ] Test like button (uses localStorage)
- [ ] Test responsive design on mobile
- [ ] Check Lighthouse score (90+)
- [ ] Verify sitemap at `/sitemap.xml`
- [ ] Submit sitemap to Google Search Console
- [ ] Setup Google Analytics

## Rollback Deployment

If something goes wrong:

```bash
# View deployment history
vercel ls

# Rollback to previous version
vercel rollback

# Or in Dashboard: Deployments → Select old version → Promote to Production
```

## Update After Deployment

To add new photos or make changes:

1. **Make changes locally**
   ```bash
   # Add new photos to public/images/gallery/
   # Update src/data/photos.json
   # Test locally
   npm run dev
   ```

2. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Add new photos"
   git push origin main
   ```

3. **Vercel Auto-Deploys**
   - Vercel automatically deploys when you push to main
   - Watch deployment in Vercel Dashboard
   - New version goes live automatically

## Advanced: Environment Variables

Create different configurations for dev/production:

```bash
# Create .env files
.env.local          # Local development
.env.production      # Production secrets

# In Vercel Dashboard:
# Settings → Environment Variables
# Add any secrets needed for future API integration
```

## Support

Need help? Check:
1. [Vercel Docs](https://vercel.com/docs)
2. [GitHub Pages Alternative Guide](https://docs.github.com/en/pages)
3. [Netlify Deploy Guide](https://docs.netlify.com/get-started/build-deployments/)

---

**Your photo gallery is now live! Share it with friends and family! 📸**
