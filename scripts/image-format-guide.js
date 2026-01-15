#!/usr/bin/env node

/**
 * Image Format Conversion Guide
 * 
 * This file provides quick reference for converting images
 * to formats compatible with the photo gallery
 */

const CONVERSION_GUIDE = `
╔════════════════════════════════════════════════════════════════════════════╗
║                   📸 IMAGE FORMAT CONVERSION GUIDE                         ║
╚════════════════════════════════════════════════════════════════════════════╝

🚀 QUICKEST SOLUTION - Use the Included Sharp Script:
═════════════════════════════════════════════════════════════════════════════

1. Place your photos in a folder: ~/Downloads/my-photos/

2. Run this command:
   
   node scripts/optimize-images.js ~/Downloads/my-photos

3. Your optimized images appear in: public/images/gallery/

✨ That's it! The script handles:
   • Format conversion (PNG/TIFF → JPEG)
   • Resizing (→ 1200x1200px max)
   • Compression (80% quality)
   • Thumbnail generation (300x300px)


📋 SUPPORTED INPUT FORMATS:
═════════════════════════════════════════════════════════════════════════════

Input Format         Recommended          Notes
─────────────────────────────────────────────────────────────────────────────
✅ JPEG (.jpg)      Best                 Already optimized
✅ PNG (.png)       Very Good            Converted to JPEG
✅ WEBP (.webp)     Excellent            Modern format
✅ TIFF (.tiff)     Good                 High quality, large files
⚠️  GIF (.gif)      Not Recommended      Use PNG/JPEG instead
❌ BMP (.bmp)       Not Supported        Use PNG/JPEG instead


🎯 RECOMMENDED SETTINGS:
═════════════════════════════════════════════════════════════════════════════

Setting              Value           Reason
─────────────────────────────────────────────────────────────────────────────
JPEG Quality         80%             Perfect balance quality/size
Max Width            1200px          Perfect for desktop & mobile
Max Height           1200px          Maintain aspect ratio
Thumbnail Size       300x300px       Perfect for grid preview
Progressive JPEG     Yes             Better user experience
WebP Format          Optional        Extra 20-30% compression


📊 TYPICAL RESULTS:
═════════════════════════════════════════════════════════════════════════════

Input Format    Original Size    Output Size    Compression    Time
─────────────────────────────────────────────────────────────────────────────
PNG (2000px)    2.5 MB          185 KB         93%            2 sec
TIFF (3000px)   4.2 MB          220 KB         95%            3 sec
JPEG (1200px)   450 KB          140 KB         69%            1 sec
RAW (4000px)    8.5 MB          280 KB         97%            4 sec


🔧 TOOL COMPARISON:
═════════════════════════════════════════════════════════════════════════════

Tool                Installation    Ease    Batch    Speed   Best For
─────────────────────────────────────────────────────────────────────────────
Sharp Script        npm install     ⭐⭐⭐⭐⭐  ✅      Fast    Development
ImageMagick CLI     brew install    ⭐⭐⭐    ✅      Fast    Advanced users
Squoosh (Web)       None needed     ⭐⭐⭐⭐⭐  ~20     Slow    Quick jobs
TinyPNG/TinyJPG     None needed     ⭐⭐⭐⭐   ~20     Slow    Simplicity
ImageOptim (macOS)  Download app    ⭐⭐⭐⭐   ❌      Fast    Mac users


💡 QUICK COMMANDS:
═════════════════════════════════════════════════════════════════════════════

Task                            Command
─────────────────────────────────────────────────────────────────────────────
Optimize your photos            node scripts/optimize-images.js ~/my-photos
With WebP conversion            node scripts/optimize-images.js ~/my-photos --webp
Custom quality (75%)            node scripts/optimize-images.js ~/my-photos --quality 75
Custom max width                node scripts/optimize-images.js ~/my-photos --width 1000
Show help                       node scripts/optimize-images.js


🌐 ONLINE TOOL LINKS:
═════════════════════════════════════════════════════════════════════════════

Squoosh          https://squoosh.app              (Recommended)
TinyPNG/TinyJPG  https://tinypng.com              (Best compression)
Compressor.io    https://compressor.io            (Simple UI)
ImageOptim       https://imageoptim.com           (macOS only)


📸 FORMAT SPECIFICS:
═════════════════════════════════════════════════════════════════════════════

JPEG (.jpg)
  Pros:   Widely supported, good compression, photos look great
  Cons:   Lossy (quality decreases with compression)
  Best:   Color photos, portraits, complex images
  Size:   140-300 KB at 80% quality (1200px)

PNG (.png)
  Pros:   Lossless (no quality loss), transparent backgrounds
  Cons:   Larger file size than JPEG
  Best:   Screenshots, graphics, images with transparency
  Size:   400-800 KB (lossless)

WEBP (.webp)
  Pros:   Better compression than JPEG, modern format
  Cons:   Older browsers don't support
  Best:   Modern browsers, optional enhancement
  Size:   20-30% smaller than JPEG

TIFF (.tiff)
  Pros:   High quality, lossless options
  Cons:   Very large file size
  Best:   Professional/archive use (not web)
  Size:   5-10 MB per image


✨ BEST PRACTICE WORKFLOW:
═════════════════════════════════════════════════════════════════════════════

1. Gather original photos (phone camera, DSLR, etc.)
   
2. Run Sharp optimization:
   node scripts/optimize-images.js ~/original-photos
   
3. Verify output in: public/images/gallery/
   
4. Update src/data/photos.json with file paths
   
5. Test in browser: npm run dev
   
6. Deploy to Vercel when ready!


🚨 COMMON MISTAKES TO AVOID:
═════════════════════════════════════════════════════════════════════════════

❌ Using original large files directly
   → Slows down gallery, poor UX
   ✅ Always optimize first

❌ Over-compressing (quality <70%)
   → Photos look blurry/pixelated
   ✅ Use 80% quality as standard

❌ Inconsistent formats (some PNG, some JPEG)
   → Unprofessional look
   ✅ Convert all to JPEG

❌ Forgetting thumbnails
   → Grid looks slow, poor UX
   ✅ Sharp creates these automatically

❌ Using huge dimensions (3000+ px)
   → Unnecessary bandwidth
   ✅ 1200px max is plenty


📞 GETTING HELP:
═════════════════════════════════════════════════════════════════════════════

Sharp Issues:         npm install -D sharp
ImageMagick Issues:   brew install imagemagick
Online Tools:         No installation needed!
Still stuck?          Check IMAGE_OPTIMIZATION.md


🎉 YOU'RE READY TO GO!
═════════════════════════════════════════════════════════════════════════════

Next Step: Run this command with your photos folder:

  node scripts/optimize-images.js ~/path/to/your/photos

Then update src/data/photos.json and deploy! 🚀

`;

console.log(CONVERSION_GUIDE);

// Export for programmatic use
export default CONVERSION_GUIDE;
