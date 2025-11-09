/**
 * Example usage of the Vehicle Window Images collection
 */

import {
  vehicleWindowImages,
  VehicleWindowImage,
  getUniqueBrands,
  getUniqueModels,
  getImagesByBrand,
  getImagesByModel,
  getImagesByYearRange,
  searchByDescription,
} from '../data/vehicleWindowImages';

// Example 1: Get all images
export function getAllImages() {
  const allImages = vehicleWindowImages;
  console.log(`Total images: ${allImages.length}`);
  return allImages;
}

// Example 2: Get all unique brands
export function getAllBrands() {
  const brands = getUniqueBrands();
  console.log('Available brands:', brands);
  return brands;
}

// Example 3: Get all unique models
export function getAllModels() {
  const models = getUniqueModels();
  console.log('Available models:', models);
  return models;
}

// Example 4: Filter by brand
export function getFordfImages() {
  const fordImages = getImagesByBrand('FORD');
  console.log(`Found ${fordImages.length} Ford images`);
  return fordImages;
}

// Example 5: Filter by specific model
export function getTransitCustomImages() {
  const transitImages = getImagesByModel('TRANSIT-CUSTOM-TDI');
  console.log(`Found ${transitImages.length} Transit Custom TDI images`);
  return transitImages;
}

// Example 6: Filter by year range (e.g., recent vehicles 2020-2024)
export function getRecentVehicleImages() {
  const recentImages = getImagesByYearRange(2020, 2024);
  console.log(`Found ${recentImages.length} images for vehicles from 2020-2024`);
  return recentImages;
}

// Example 7: Search by description (e.g., find all front door windows)
export function getFrontDoorWindows() {
  const frontDoorImages = searchByDescription('PUERTA-DELANTERA');
  console.log(`Found ${frontDoorImages.length} front door window images`);
  return frontDoorImages;
}

// Example 8: Search for medallion windows
export function getMedallionWindows() {
  const medallionImages = searchByDescription('MEDALLON');
  console.log(`Found ${medallionImages.length} medallion window images`);
  return medallionImages;
}

// Example 9: Get right side windows
export function getRightSideWindows() {
  const rightSideImages = searchByDescription('DERECHO');
  console.log(`Found ${rightSideImages.length} right side window images`);
  return rightSideImages;
}

// Example 10: Complex filtering - Mercedes Sprinter front doors from 2015-2024
export function getMercedesSprinterFrontDoors() {
  const mercedesImages = getImagesByBrand('MERCEDES');
  const sprinterImages = mercedesImages.filter(img => img.model === 'SPRINTER');
  const frontDoorImages = sprinterImages.filter(img =>
    img.description.includes('PUERTA-DELANTERA')
  );
  const recentImages = frontDoorImages.filter(
    img => img.startYear >= 2015 && img.endYear <= 2024
  );

  console.log(`Found ${recentImages.length} Mercedes Sprinter front door windows (2015-2024)`);
  return recentImages;
}

// Example 11: Group images by brand
export function groupImagesByBrand() {
  const grouped: Record<string, VehicleWindowImage[]> = {};

  vehicleWindowImages.forEach(img => {
    if (!grouped[img.brand]) {
      grouped[img.brand] = [];
    }
    grouped[img.brand].push(img);
  });

  Object.keys(grouped).forEach(brand => {
    console.log(`${brand}: ${grouped[brand].length} images`);
  });

  return grouped;
}

// Example 12: Get window size statistics
export function getWindowSizeStats() {
  const sizes = vehicleWindowImages.map(img => ({
    brand: img.brand,
    model: img.model,
    width: img.size.width,
    height: img.size.height,
    area: img.size.width * img.size.height,
  }));

  const avgWidth = sizes.reduce((sum, s) => sum + s.width, 0) / sizes.length;
  const avgHeight = sizes.reduce((sum, s) => sum + s.height, 0) / sizes.length;
  const maxArea = Math.max(...sizes.map(s => s.area));
  const minArea = Math.min(...sizes.filter(s => s.area > 0).map(s => s.area));

  const largest = sizes.find(s => s.area === maxArea);
  const smallest = sizes.find(s => s.area === minArea);

  console.log(`Average window size: ${avgWidth.toFixed(0)}cm x ${avgHeight.toFixed(0)}cm`);
  console.log(`Largest window: ${largest?.brand} ${largest?.model} - ${largest?.width}cm x ${largest?.height}cm`);
  console.log(`Smallest window: ${smallest?.brand} ${smallest?.model} - ${smallest?.width}cm x ${smallest?.height}cm`);

  return {
    avgWidth: Math.round(avgWidth),
    avgHeight: Math.round(avgHeight),
    largest,
    smallest,
  };
}

// Example 13: Find windows by window code
export function getWindowsByCode(code: string) {
  const windowsWithCode = vehicleWindowImages.filter(img => img.windowCode === code);
  console.log(`Found ${windowsWithCode.length} windows with code ${code}`);
  return windowsWithCode;
}

// Example 14: Get all window codes and their counts
export function getWindowCodeStats() {
  const codes: Record<string, number> = {};

  vehicleWindowImages.forEach(img => {
    codes[img.windowCode] = (codes[img.windowCode] || 0) + 1;
  });

  console.log('Window code distribution:');
  Object.entries(codes)
    .sort((a, b) => b[1] - a[1])
    .forEach(([code, count]) => {
      console.log(`  ${code}: ${count} windows`);
    });

  return codes;
}

// Example 15: Search for specific vehicle
export function findVehicle(brand: string, model: string, year: number) {
  const vehicleImages = vehicleWindowImages.filter(
    img =>
      img.brand === brand &&
      img.model === model &&
      img.startYear <= year &&
      img.endYear >= year
  );

  console.log(`Found ${vehicleImages.length} windows for ${brand} ${model} (${year})`);
  return vehicleImages;
}

// Run examples
if (require.main === module) {
  console.log('\n=== Vehicle Window Images Examples ===\n');

  getAllBrands();
  console.log('');

  getFordfImages();
  console.log('');

  getRecentVehicleImages();
  console.log('');

  getFrontDoorWindows();
  console.log('');

  getWindowSizeStats();
  console.log('');

  getWindowCodeStats();
  console.log('');

  findVehicle('FORD', 'TRANSIT-CUSTOM-TDI', 2020);
}
