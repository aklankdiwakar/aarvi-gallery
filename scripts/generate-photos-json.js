#!/usr/bin/env node

/**
 * Auto-generate photos.json entries from images in public/images/gallery
 * 
 * Usage:
 *   node scripts/generate-photos-json.js
 */

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const galleryDir = path.join(__dirname, '../public/images/gallery');
const photosJsonPath = path.join(__dirname, '../src/data/photos.json');

/**
 * Get all images from gallery (excluding thumbnails)
 */
function getGalleryImages(dir) {
  const files = fs.readdirSync(dir);
  return files
    .filter(file => !file.includes('-thumb') && file.endsWith('.jpg'))
    .sort();
}

/**
 * Get image dimensions
 */
async function getImageDimensions(imagePath) {
  try {
    const metadata = await sharp(imagePath).metadata();
    return { width: metadata.width, height: metadata.height };
  } catch (error) {
    console.warn(`Warning: Could not get dimensions for ${path.basename(imagePath)}`);
    return { width: 1200, height: 800 };
  }
}

/**
 * Create friendly title from filename
 */
function createTitle(filename) {
  return filename
    .replace(/\.[^/.]+$/, '') // Remove extension
    .replace(/[-_]/g, ' ') // Replace dashes/underscores with spaces
    .replace(/^(.)|\s(.)/g, match => match.toUpperCase()); // Capitalize
}

/**
 * Main function
 */
async function main() {
  console.log('\n📸 Auto-generating photos.json entries\n');

  if (!fs.existsSync(galleryDir)) {
    console.error(`❌ Gallery directory not found: ${galleryDir}`);
    process.exit(1);
  }

  const images = getGalleryImages(galleryDir);

  if (images.length === 0) {
    console.error('❌ No images found in gallery folder');
    process.exit(1);
  }

  console.log(`Found ${images.length} image(s)\n`);

  const photos = [];

  // Process each image
  for (let i = 0; i < images.length; i++) {
    const filename = images[i];
    const imagePath = path.join(galleryDir, filename);
    const dimensions = await getImageDimensions(imagePath);
    const fileSize = fs.statSync(imagePath).size;

    const photo = {
      id: i + 1,
      title: createTitle(filename),
      src: `/images/gallery/${filename}`,
      thumbnail: `/images/gallery/${filename.replace('.jpg', '-thumb.jpg')}`,
      date: new Date().toISOString().split('T')[0], // Today's date
      category: 'special-moments', // Default category
      alt: `Photo ${i + 1}`,
      width: dimensions.width,
      height: dimensions.height,
      likes: 0,
      description: `A precious moment - Photo ${i + 1}`,
    };

    photos.push(photo);

    console.log(`✅ Photo ${i + 1}`);
    console.log(`   File: ${filename}`);
    console.log(`   Title: ${photo.title}`);
    console.log(`   Dimensions: ${photo.width}x${photo.height}`);
    console.log(`   Size: ${(fileSize / 1024).toFixed(1)} KB\n`);
  }

  // Check if photos.json exists
  let existingData = { metadata: { totalPhotos: 0, categories: ['outdoor', 'indoor', 'special-moments'], lastUpdated: new Date().toISOString().split('T')[0] } };

  if (fs.existsSync(photosJsonPath)) {
    try {
      const current = JSON.parse(fs.readFileSync(photosJsonPath, 'utf-8'));
      existingData.metadata = current.metadata || existingData.metadata;
    } catch (e) {
      console.warn('Warning: Could not parse existing photos.json');
    }
  }

  // Create new data structure
  const newData = {
    photos,
    metadata: {
      ...existingData.metadata,
      totalPhotos: photos.length,
      lastUpdated: new Date().toISOString().split('T')[0],
    },
  };

  // Write to photos.json
  fs.writeFileSync(photosJsonPath, JSON.stringify(newData, null, 2) + '\n');

  console.log('════════════════════════════════════════');
  console.log('✨ Success!');
  console.log('════════════════════════════════════════');
  console.log(`✅ Updated: ${photosJsonPath}`);
  console.log(`📸 Total photos: ${photos.length}`);
  console.log(`📅 Last updated: ${newData.metadata.lastUpdated}\n`);

  console.log('📝 Next Steps:');
  console.log('1. Review photos.json and customize:');
  console.log('   - Update titles (currently auto-generated from filenames)');
  console.log('   - Set categories: outdoor, indoor, special-moments');
  console.log('   - Add descriptions');
  console.log('   - Update dates\n');
  console.log('2. Test in browser:');
  console.log('   npm run dev\n');
  console.log('3. Deploy when ready:');
  console.log('   npm run build\n');
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
