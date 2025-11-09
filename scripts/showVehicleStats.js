#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read all files from public/detail-glass
const detailGlassDir = path.join(__dirname, '..', 'public', 'detail-glass');
const files = fs.readdirSync(detailGlassDir).filter(file =>
  /\.(PNG|png|jpg|jpeg)$/i.test(file)
);

// Parse all files
function parseVehicleWindowFilename(filename) {
  const nameWithoutExt = filename.replace(/\.(PNG|png|jpg|jpeg)$/i, '');
  const parts = nameWithoutExt.split('-');

  if (parts.length < 7) return null;

  const brand = parts[0];

  let startYearIndex = -1;
  for (let i = 1; i < parts.length; i++) {
    const part = parts[i].trim();
    if (/^\d{4}$/.test(part)) {
      const year = parseInt(part, 10);
      if (year >= 2000 && year <= 2030) {
        startYearIndex = i;
        break;
      }
    }
  }

  if (startYearIndex === -1) return null;

  const modelParts = parts.slice(1, startYearIndex);
  const model = modelParts.join('-');

  return { filename, brand, model };
}

const parsedImages = files
  .map(file => parseVehicleWindowFilename(file))
  .filter(img => img !== null);

// Group by brand
const brandGroups = {};
parsedImages.forEach(img => {
  if (!brandGroups[img.brand]) {
    brandGroups[img.brand] = new Set();
  }
  brandGroups[img.brand].add(img.model);
});

console.log('\n=== VEHICLE WINDOW IMAGES SUMMARY ===\n');
console.log(`Total images: ${parsedImages.length}`);
console.log(`Total brands: ${Object.keys(brandGroups).length}`);
console.log(`Total unique models: ${new Set(parsedImages.map(i => i.model)).size}\n`);

console.log('=== BRANDS AND MODELS ===\n');

Object.keys(brandGroups).sort().forEach(brand => {
  const models = Array.from(brandGroups[brand]).sort();
  const imageCount = parsedImages.filter(i => i.brand === brand).length;
  console.log(`${brand} (${imageCount} images):`);
  models.forEach(model => {
    const modelImageCount = parsedImages.filter(i => i.model === model).length;
    console.log(`  - ${model} (${modelImageCount} images)`);
  });
  console.log('');
});
