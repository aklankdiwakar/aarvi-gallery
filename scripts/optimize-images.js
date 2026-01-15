#!/usr/bin/env node

/**
 * Image Optimization Script
 * Converts and optimizes images for the photo gallery
 * 
 * Usage:
 *   node scripts/optimize-images.js /path/to/images
 *   node scripts/optimize-images.js ./my-photos
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configuration
const CONFIG = {
  MAX_WIDTH: 1200,
  MAX_HEIGHT: 1200,
  QUALITY: 80,
  THUMBNAIL_SIZE: 300,
};

const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.webp', '.tiff'];

/**
 * Get all image files from a directory
 */
function getImageFiles(dirPath) {
  if (!fs.existsSync(dirPath)) {
    console.error(`❌ Directory not found: ${dirPath}`);
    process.exit(1);
  }

  const files = fs.readdirSync(dirPath);
  return files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return SUPPORTED_FORMATS.includes(ext);
  });
}

/**
 * Optimize a single image
 */
async function optimizeImage(inputPath, outputDir, filename) {
  try {
    const outputFileName = path.parse(filename).name;
    const outputPath = path.join(outputDir, `${outputFileName}.jpg`);
    const thumbnailPath = path.join(outputDir, `${outputFileName}-thumb.jpg`);

    // Main image optimization
    await sharp(inputPath)
      .resize(CONFIG.MAX_WIDTH, CONFIG.MAX_HEIGHT, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .jpeg({ quality: CONFIG.QUALITY, progressive: true })
      .toFile(outputPath);

    // Thumbnail generation
    await sharp(inputPath)
      .resize(CONFIG.THUMBNAIL_SIZE, CONFIG.THUMBNAIL_SIZE, {
        fit: 'cover',
        position: 'center',
      })
      .jpeg({ quality: CONFIG.QUALITY, progressive: true })
      .toFile(thumbnailPath);

    // Get file sizes
    const originalSize = fs.statSync(inputPath).size;
    const optimizedSize = fs.statSync(outputPath).size;
    const compression = Math.round(((originalSize - optimizedSize) / originalSize) * 100);

    console.log(`✅ ${filename}`);
    console.log(`   Original: ${(originalSize / 1024).toFixed(2)} KB`);
    console.log(`   Optimized: ${(optimizedSize / 1024).toFixed(2)} KB`);
    console.log(`   Compression: ${compression}%`);
    console.log(`   Output: ${outputPath}`);
    console.log(`   Thumbnail: ${thumbnailPath}`);
    console.log('');

    return { success: true, original: originalSize, optimized: optimizedSize };
  } catch (error) {
    console.error(`❌ Error processing ${filename}:`, error.message);
    return { success: false };
  }
}

/**
 * Convert image to WebP format (optional)
 */
async function convertToWebP(inputPath, outputDir, filename) {
  try {
    const outputFileName = path.parse(filename).name;
    const outputPath = path.join(outputDir, `${outputFileName}.webp`);

    await sharp(inputPath)
      .resize(CONFIG.MAX_WIDTH, CONFIG.MAX_HEIGHT, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ quality: CONFIG.QUALITY })
      .toFile(outputPath);

    const webpSize = fs.statSync(outputPath).size;
    console.log(`   WebP: ${(webpSize / 1024).toFixed(2)} KB - ${outputPath}`);

    return { success: true, size: webpSize };
  } catch (error) {
    console.error(`   ⚠️ WebP conversion failed for ${filename}:`, error.message);
    return { success: false };
  }
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
📸 Image Optimization Script
============================

Usage:
  node scripts/optimize-images.js <input-directory> [output-directory]

Examples:
  node scripts/optimize-images.js ./my-photos
  node scripts/optimize-images.js ./my-photos ./public/images/gallery
  node scripts/optimize-images.js ~/Downloads/family-photos ./public/images/gallery

Options:
  --webp          Also convert to WebP format
  --quality 75    Set JPEG quality (1-100, default: 80)
  --width 1000    Set max width in pixels (default: 1200)

The script will:
  1. Resize images to fit 1200x1200px
  2. Compress to 80% quality
  3. Generate 300x300px thumbnails
  4. Output as progressive JPEGs for faster loading
    `);
    process.exit(0);
  }

  const inputDir = args[0];
  const outputDir = args[1] || path.join(__dirname, '../public/images/gallery');
  const shouldConvertWebP = args.includes('--webp');

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log(`
📸 Image Optimization Script
============================
Input Directory: ${inputDir}
Output Directory: ${outputDir}
Quality: ${CONFIG.QUALITY}%
Max Width: ${CONFIG.MAX_WIDTH}px
Generate WebP: ${shouldConvertWebP ? 'Yes' : 'No'}
`);

  const imageFiles = getImageFiles(inputDir);

  if (imageFiles.length === 0) {
    console.log('❌ No supported image files found in the directory');
    console.log(`Supported formats: ${SUPPORTED_FORMATS.join(', ')}`);
    process.exit(1);
  }

  console.log(`Found ${imageFiles.length} image(s)\n`);

  let totalStats = { success: 0, failed: 0, originalSize: 0, optimizedSize: 0 };

  // Process each image
  for (const file of imageFiles) {
    const inputPath = path.join(inputDir, file);
    const result = await optimizeImage(inputPath, outputDir, file);

    if (result.success) {
      totalStats.success++;
      totalStats.originalSize += result.original;
      totalStats.optimizedSize += result.optimized;

      // Optionally convert to WebP
      if (shouldConvertWebP) {
        await convertToWebP(inputPath, outputDir, file);
      }
    } else {
      totalStats.failed++;
    }
  }

  // Summary
  console.log('============================');
  console.log('📊 Summary');
  console.log('============================');
  console.log(`✅ Processed: ${totalStats.success}/${imageFiles.length}`);
  console.log(`❌ Failed: ${totalStats.failed}/${imageFiles.length}`);
  console.log(`📈 Total Compression: ${(totalStats.originalSize / 1024).toFixed(2)} KB → ${(totalStats.optimizedSize / 1024).toFixed(2)} KB`);
  console.log(`🎯 Space Saved: ${(((totalStats.originalSize - totalStats.optimizedSize) / totalStats.originalSize) * 100).toFixed(1)}%`);
  console.log('');
  console.log('✨ Done! Images are ready for the gallery');
  console.log('');
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
