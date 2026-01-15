# 📸 Image Optimization Tools & Guide

Complete guide for converting and optimizing photos for your gallery.

## 🚀 Quick Start (Recommended)

### Using the Sharp Script (Node.js)

**1. Prepare Your Photos**
Create a folder with your photos (e.g., `~/Downloads/my-photos/`)

**2. Run the Optimization Script**
```bash
cd /path/to/AarviVSInsight
node scripts/optimize-images.js ~/Downloads/my-photos
```

**3. Find Optimized Images**
- Optimized: `public/images/gallery/photo-name.jpg`
- Thumbnails: `public/images/gallery/photo-name-thumb.jpg`

**4. Update photos.json**
See the photo metadata file with new image paths

---

## 📝 Image Optimization Options

### Option 1: Sharp Script (Easiest)

**Already installed and ready to use!**

```bash
# Basic usage
node scripts/optimize-images.js ~/path/to/photos

# Specify output directory
node scripts/optimize-images.js ~/photos ./public/images/gallery

# Convert to WebP too
node scripts/optimize-images.js ~/photos --webp

# Custom quality (1-100)
node scripts/optimize-images.js ~/photos --quality 75

# Custom width
node scripts/optimize-images.js ~/photos --width 1000
```

**What it does:**
- ✅ Resizes to max 1200px width
- ✅ Compresses to 80% JPEG quality
- ✅ Generates 300x300px thumbnails
- ✅ Creates progressive JPEGs for faster loading
- ✅ Shows compression statistics
- ✅ Optional WebP conversion

**Example Output:**
```
📸 Image Optimization Script
============================
Found 5 image(s)

✅ family-photo-1.png
   Original: 3450.25 KB
   Optimized: 245.18 KB
   Compression: 93%
   Output: public/images/gallery/family-photo-1.jpg
   Thumbnail: public/images/gallery/family-photo-1-thumb.jpg

📊 Summary
============================
✅ Processed: 5/5
❌ Failed: 0/5
📈 Total Compression: 18540 KB → 1340 KB
🎯 Space Saved: 92.8%
```

---

### Option 2: Command Line Tools (Manual)

#### ImageMagick (macOS)

**Install:**
```bash
brew install imagemagick
```

**Optimize single image:**
```bash
# Resize and compress
convert input.jpg -quality 80 -resize 1200x1200 output.jpg

# Create thumbnail
convert input.jpg -quality 80 -resize 300x300 -gravity Center -extent 300x300 thumbnail.jpg
```

**Batch process:**
```bash
# Compress all JPGs
for file in *.jpg; do
  convert "$file" -quality 80 "optimized_$file"
done

# Resize all to 1200px width
for file in *.jpg; do
  convert "$file" -resize 1200x "resized_$file"
done
```

#### ImageOptim (macOS App)

**Download:** [imageoptim.com](https://imageoptim.com)

**Usage:**
1. Download and install
2. Drag photos onto the app
3. Automatically optimizes in place
4. Move optimized photos to `public/images/gallery/`

---

### Option 3: Online Tools (No Installation)

#### Squoosh (Best)
- **Website:** [squoosh.app](https://squoosh.app)
- **Features:** Real-time compression, WebP conversion, quality comparison
- **How:** Drag photos → adjust quality → download

#### TinyPNG / TinyJPG
- **Website:** [tinypng.com](https://tinypng.com)
- **Features:** Bulk upload (up to 20 files), excellent compression
- **How:** Drag photos → auto-optimized → download

#### Compressor.io
- **Website:** [compressor.io](https://compressor.io)
- **Features:** Batch processing, multiple formats
- **How:** Upload → choose quality → download

---

## 📊 Recommended Image Specifications

| Usage | Format | Quality | Max Width | Size |
|-------|--------|---------|-----------|------|
| Gallery Display | JPEG | 80% | 1200px | <250KB |
| Thumbnail | JPEG | 80% | 300px | <30KB |
| Hero Section | JPEG | 85% | 1920px | <400KB |
| Mobile | JPEG | 75% | 800px | <150KB |

---

## 🎯 Step-by-Step Guide

### Step 1: Gather Your Photos
Create a folder with all photos you want to add:
```
~/family-photos/
├── aarvi-playing.png
├── aarvi-smiling.jpg
├── outdoor-photo.png
└── birthday-photo.jpg
```

### Step 2: Optimize

**Using Sharp (Recommended):**
```bash
node /path/to/AarviVSInsight/scripts/optimize-images.js ~/family-photos
```

**Using ImageMagick:**
```bash
cd ~/family-photos
for file in *; do
  convert "$file" -quality 80 -resize 1200x1200 "optimized_$file"
done
```

**Using Online Tool:**
- Go to [squoosh.app](https://squoosh.app)
- Drag & drop your photos
- Adjust quality to 80
- Download optimized versions

### Step 3: Verify Output
Check that files were created:
```bash
ls -lh public/images/gallery/
```

You should see:
- `photo-name.jpg` (main image)
- `photo-name-thumb.jpg` (thumbnail)

### Step 4: Update photos.json

For each optimized photo, add entry to `src/data/photos.json`:

```json
{
  "id": 1,
  "title": "Aarvi Playing",
  "src": "/images/gallery/aarvi-playing.jpg",
  "thumbnail": "/images/gallery/aarvi-playing-thumb.jpg",
  "date": "2026-01-15",
  "category": "indoor",
  "alt": "Aarvi playing with toys",
  "width": 1200,
  "height": 800,
  "likes": 0,
  "description": "A beautiful moment of Aarvi playing"
}
```

### Step 5: Test in Browser
```bash
npm run dev
```
Visit http://localhost:5173/ and verify photos appear!

---

## 🔧 Advanced Usage

### Create Batch Processing Script

**Create `batch-optimize.sh`:**
```bash
#!/bin/bash

INPUT_DIR="${1:-.}"
OUTPUT_DIR="${2:-./public/images/gallery}"

echo "📸 Batch Image Optimization"
echo "Input: $INPUT_DIR"
echo "Output: $OUTPUT_DIR"

node scripts/optimize-images.js "$INPUT_DIR" "$OUTPUT_DIR" --webp

echo "✅ Complete! Check $OUTPUT_DIR"
```

**Make executable:**
```bash
chmod +x batch-optimize.sh

# Use it:
./batch-optimize.sh ~/my-photos
```

### Use Both Sharp and ImageMagick

**Hybrid approach for best results:**
```bash
# 1. Pre-process with ImageMagick (fast)
for file in *.png; do
  convert "$file" -quality 85 "${file%.png}.jpg"
done

# 2. Fine-tune with Sharp
node scripts/optimize-images.js . --quality 80 --width 1200
```

---

## 💡 Tips for Best Results

1. **Original Size Matters**
   - Start with highest quality originals
   - Larger originals = better quality after compression

2. **Quality Settings**
   - 80% JPEG quality = imperceptible loss
   - 75% quality for small files
   - 85%+ only if file size not critical

3. **Check File Sizes**
   - Target: <250KB per photo
   - Gallery photos: 150-250KB each
   - Total gallery: under 10MB for best speed

4. **Test on Mobile**
   - Use DevTools to throttle network
   - Verify images load quickly
   - Check that quality is acceptable

5. **Use Progressive JPEGs**
   - Loads low quality first, then improves
   - Sharp script uses this automatically
   - Much better user experience

---

## 🚀 Automation

### Add npm Script

**Edit `package.json`:**
```json
{
  "scripts": {
    "optimize-images": "node scripts/optimize-images.js",
    "optimize-to-gallery": "node scripts/optimize-images.js ./my-photos ./public/images/gallery"
  }
}
```

**Then use:**
```bash
npm run optimize-to-gallery
```

### Watch Mode (Auto-optimize on changes)

**Create `scripts/watch-images.js`:**
```javascript
import chokidar from 'chokidar';
import { execSync } from 'child_process';

const watcher = chokidar.watch('./my-photos', { persistent: true });

watcher.on('add', (path) => {
  console.log(`New photo detected: ${path}`);
  execSync(`node scripts/optimize-images.js ./my-photos`);
});

console.log('📸 Watching for new photos...');
```

---

## ⚠️ Troubleshooting

### "Sharp not found"
```bash
npm install -D sharp
```

### "ImageMagick not found"
```bash
# macOS
brew install imagemagick

# Ubuntu
sudo apt-get install imagemagick

# Windows
choco install imagemagick
```

### Photos too small after optimization
- Original was too small to begin with
- Use higher quality source
- Adjust Sharp quality to 85-90%

### WebP conversion fails
- Not all browsers support WebP on older systems
- Stick with JPEG for max compatibility
- WebP is optional enhancement

### Script says "No supported formats"
Check file extensions:
```bash
# List files
ls -la ~/my-photos/

# Supported: .jpg, .jpeg, .png, .webp, .tiff
```

---

## 📈 Expected Results

When optimizing photos:
- **Original:** 3-5 MB large photos
- **After Sharp:** 200-300 KB with thumbnails
- **Compression:** 90-95% reduction
- **Quality:** Visually identical to original
- **Load Time:** <2 seconds for full gallery

---

## 🎓 Learn More

- [Sharp Documentation](https://sharp.pixelplumbing.com/)
- [ImageMagick Manual](https://imagemagick.org/Usage/)
- [Web Image Optimization Guide](https://web.dev/image-optimization/)
- [JPEG Quality Guide](https://medium.com/hd-pro/jpeg-quality-guide-2019-7a7da5e2384a)

---

**Ready to optimize? Run this command:**
```bash
node scripts/optimize-images.js ~/path/to/your/photos
```
