#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Parses a filename according to the vehicle window naming convention
 */
function parseVehicleWindowFilename(filename) {
  // Remove file extension
  const nameWithoutExt = filename.replace(/\.(PNG|png|jpg|jpeg)$/i, '');

  const parts = nameWithoutExt.split('-');

  if (parts.length < 7) {
    console.warn(`Filename "${filename}" does not have enough parts`);
    return null;
  }

  // First part is always the brand
  const brand = parts[0];

  // Find the start year (first 4-digit number that looks like a year between 2000-2030)
  let startYearIndex = -1;
  let startYear = 0;
  let endYear = 0;

  for (let i = 1; i < parts.length; i++) {
    const part = parts[i].trim();
    if (/^\d{4}$/.test(part)) {
      const year = parseInt(part, 10);
      if (year >= 2000 && year <= 2030) {
        startYearIndex = i;
        startYear = year;
        // Next part should be end year
        if (i + 1 < parts.length && /^\d{4}$/.test(parts[i + 1])) {
          endYear = parseInt(parts[i + 1], 10);
        }
        break;
      }
    }
  }

  if (startYearIndex === -1) {
    console.warn(`Could not find start year in filename "${filename}"`);
    return null;
  }

  // Everything between brand and start year is the model (can be multi-part)
  const modelParts = parts.slice(1, startYearIndex);
  const model = modelParts.join('-');
  const submodels = modelParts;

  // After end year: windowCode, windowNumber, size, description...
  const afterYearIndex = startYearIndex + 2; // +1 for end year

  if (parts.length < afterYearIndex + 3) {
    console.warn(`Filename "${filename}" missing window data after years`);
    return null;
  }

  const windowCode = parts[afterYearIndex];
  const windowNumber = parts[afterYearIndex + 1];
  const sizeStr = parts[afterYearIndex + 2];

  // Parse size (format: 1234x1234 or 1234X1234)
  const sizeMatch = sizeStr.match(/^(\d+)[xX](\d+)$/);
  let width = 0;
  let height = 0;

  if (sizeMatch) {
    width = parseInt(sizeMatch[1], 10);
    height = parseInt(sizeMatch[2], 10);
  } else {
    console.warn(`Could not parse size from "${sizeStr}" in filename "${filename}"`);
  }

  // Everything after size is the description
  const descriptionParts = parts.slice(afterYearIndex + 3);
  const description = descriptionParts.join('-');

  return {
    filename,
    brand,
    model,
    submodels,
    startYear,
    endYear,
    windowCode,
    windowNumber,
    size: {
      width,
      height,
      raw: sizeStr,
    },
    description,
    imagePath: `/detail-glass/${filename}`,
  };
}

// Read all files from public/detail-glass
const detailGlassDir = path.join(__dirname, '..', 'public', 'detail-glass');
const files = fs.readdirSync(detailGlassDir).filter(file =>
  /\.(PNG|png|jpg|jpeg)$/i.test(file)
);

console.log(`Found ${files.length} image files`);

// Parse all files
const parsedImages = files
  .map(file => parseVehicleWindowFilename(file))
  .filter(img => img !== null);

console.log(`Successfully parsed ${parsedImages.length} images`);

// Generate TypeScript file content
const tsContent = `/**
 * Vehicle Window Image Data
 * Auto-generated collection of vehicle window images parsed from public/detail-glass folder
 *
 * Naming convention: [brand]-[model]-[startYear]-[endYear]-[windowCode]-[windowNumber]-[size]-[description]
 */

export interface VehicleWindowImage {
  filename: string;
  brand: string;
  model: string;
  submodels: string[];
  startYear: number;
  endYear: number;
  windowCode: string;
  windowNumber: string;
  size: {
    width: number;
    height: number;
    raw: string;
  };
  description: string;
  imagePath: string;
}

/**
 * Parses a filename according to the vehicle window naming convention
 */
export function parseVehicleWindowFilename(filename: string): VehicleWindowImage | null {
  // Remove file extension
  const nameWithoutExt = filename.replace(/\\.(PNG|png|jpg|jpeg)$/i, '');

  const parts = nameWithoutExt.split('-');

  if (parts.length < 7) {
    console.warn(\`Filename "\${filename}" does not have enough parts\`);
    return null;
  }

  // First part is always the brand
  const brand = parts[0];

  // Find the start year (first 4-digit number that looks like a year between 2000-2030)
  let startYearIndex = -1;
  let startYear = 0;
  let endYear = 0;

  for (let i = 1; i < parts.length; i++) {
    const part = parts[i].trim();
    if (/^\\d{4}$/.test(part)) {
      const year = parseInt(part, 10);
      if (year >= 2000 && year <= 2030) {
        startYearIndex = i;
        startYear = year;
        // Next part should be end year
        if (i + 1 < parts.length && /^\\d{4}$/.test(parts[i + 1])) {
          endYear = parseInt(parts[i + 1], 10);
        }
        break;
      }
    }
  }

  if (startYearIndex === -1) {
    console.warn(\`Could not find start year in filename "\${filename}"\`);
    return null;
  }

  // Everything between brand and start year is the model (can be multi-part)
  const modelParts = parts.slice(1, startYearIndex);
  const model = modelParts.join('-');
  const submodels = modelParts;

  // After end year: windowCode, windowNumber, size, description...
  const afterYearIndex = startYearIndex + 2; // +1 for end year

  if (parts.length < afterYearIndex + 3) {
    console.warn(\`Filename "\${filename}" missing window data after years\`);
    return null;
  }

  const windowCode = parts[afterYearIndex];
  const windowNumber = parts[afterYearIndex + 1];
  const sizeStr = parts[afterYearIndex + 2];

  // Parse size (format: 1234x1234 or 1234X1234)
  const sizeMatch = sizeStr.match(/^(\\d+)[xX](\\d+)$/);
  let width = 0;
  let height = 0;

  if (sizeMatch) {
    width = parseInt(sizeMatch[1], 10);
    height = parseInt(sizeMatch[2], 10);
  } else {
    console.warn(\`Could not parse size from "\${sizeStr}" in filename "\${filename}"\`);
  }

  // Everything after size is the description
  const descriptionParts = parts.slice(afterYearIndex + 3);
  const description = descriptionParts.join('-');

  return {
    filename,
    brand,
    model,
    submodels,
    startYear,
    endYear,
    windowCode,
    windowNumber,
    size: {
      width,
      height,
      raw: sizeStr,
    },
    description,
    imagePath: \`/detail-glass/\${filename}\`,
  };
}

/**
 * Collection of all vehicle window images
 */
export const vehicleWindowImages: VehicleWindowImage[] = ${JSON.stringify(parsedImages, null, 2)};

// Helper function to get all unique brands
export function getUniqueBrands(): string[] {
  return Array.from(new Set(vehicleWindowImages.map(img => img.brand))).sort();
}

// Helper function to get all unique models
export function getUniqueModels(): string[] {
  return Array.from(new Set(vehicleWindowImages.map(img => img.model))).sort();
}

// Helper function to filter images by brand
export function getImagesByBrand(brand: string): VehicleWindowImage[] {
  return vehicleWindowImages.filter(img => img.brand === brand);
}

// Helper function to filter images by model
export function getImagesByModel(model: string): VehicleWindowImage[] {
  return vehicleWindowImages.filter(img => img.model === model);
}

// Helper function to filter images by year range
export function getImagesByYearRange(startYear: number, endYear: number): VehicleWindowImage[] {
  return vehicleWindowImages.filter(img =>
    img.startYear <= endYear && img.endYear >= startYear
  );
}

// Helper function to search images by description
export function searchByDescription(searchTerm: string): VehicleWindowImage[] {
  const term = searchTerm.toLowerCase();
  return vehicleWindowImages.filter(img =>
    img.description.toLowerCase().includes(term)
  );
}
`;

// Write the generated TypeScript file
const outputPath = path.join(__dirname, '..', 'src', 'data', 'vehicleWindowImages.ts');
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, tsContent, 'utf8');

console.log(`Generated TypeScript file at: ${outputPath}`);
console.log(`Total images: ${parsedImages.length}`);
console.log(`Unique brands: ${new Set(parsedImages.map(i => i.brand)).size}`);
console.log(`Unique models: ${new Set(parsedImages.map(i => i.model)).size}`);
