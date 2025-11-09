# Vehicle Window Images Collection

This directory contains a TypeScript collection of all vehicle window images parsed from the `public/detail-glass` folder.

## Overview

- **Total Images**: 252
- **Total Brands**: 12
- **Total Unique Models**: 30

## File Naming Convention

Images follow this naming pattern:
```
[brand]-[model]-[startYear]-[endYear]-[windowCode]-[windowNumber]-[size]-[description]
```

### Components

- **brand**: Vehicle manufacturer (e.g., FORD, MERCEDES, RAM)
- **model**: Vehicle model, can be multi-part (e.g., TRANSIT-CUSTOM-TDI)
- **startYear**: Starting year of applicability (4 digits)
- **endYear**: Ending year of applicability (4 digits)
- **windowCode**: 2-letter code identifying window type (e.g., DB, DD, DQ, FD, FQ, FB)
- **windowNumber**: 5-6 digit part number
- **size**: Window dimensions in centimeters (format: WIDTHxHEIGHT)
- **description**: Descriptive text (e.g., PUERTA-DELANTERA-DERECHA, MEDALLON)

## Usage

### Import the Collection

```typescript
import {
  vehicleWindowImages,
  VehicleWindowImage,
  getUniqueBrands,
  getUniqueModels,
  getImagesByBrand,
  getImagesByModel,
  getImagesByYearRange,
  searchByDescription
} from './data/vehicleWindowImages';
```

### Type Definition

```typescript
interface VehicleWindowImage {
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
```

### Examples

#### Get all images
```typescript
const allImages = vehicleWindowImages;
console.log(`Total images: ${allImages.length}`);
```

#### Get all brands
```typescript
const brands = getUniqueBrands();
// ['CHEVROLET', 'FIAT', 'FORD', 'FOTON', 'HYUNDAY', 'JACK', 'MERCEDES', 'PEUGEOT', 'RAM', 'RENAULT', 'TOYOTA', 'VW']
```

#### Get images by brand
```typescript
const fordImages = getImagesByBrand('FORD');
console.log(`Ford has ${fordImages.length} images`);
```

#### Get images by model
```typescript
const transitImages = getImagesByModel('TRANSIT-CUSTOM-TDI');
```

#### Search by year range
```typescript
const recentImages = getImagesByYearRange(2020, 2024);
```

#### Search by description
```typescript
const frontDoorImages = searchByDescription('PUERTA-DELANTERA');
const medaillonImages = searchByDescription('MEDALLON');
```

## Brands and Models

### CHEVROLET (7 images)
- TORNADO (7 images)

### FIAT (23 images)
- DUCATO (9 images)
- DUCATO-MAXI-18 (14 images)

### FORD (53 images)
- TRANSIT (3 images)
- TRANSIT-100.8 (8 images)
- TRANSIT-110.2 (8 images)
- TRANSIT-110.2L (8 images)
- TRANSIT-83.2 (6 images)
- TRANSIT-CORTA (4 images)
- TRANSIT-CUSTOM (6 images)
- TRANSIT-CUSTOM-TDI (6 images)
- TRANSIT-EXTENDIDA (4 images)

### FOTON (7 images)
- VIEW-CS2 (7 images)

### HYUNDAY (10 images)
- SOLATI-H350 (6 images)
- STAREX (4 images)

### JACK (8 images)
- SUNRAY (8 images)

### MERCEDES (25 images)
- SPRINTER (25 images)

### PEUGEOT (31 images)
- MANAGER-L2H2 (6 images)
- MANAGER-L4H2 (14 images)
- PARTNER (6 images)
- RIFTER (5 images)

### RAM (29 images)
- PROMASTER1500 (6 images)
- PROMASTER2019 (3 images)
- PROMASTER2500 (6 images)
- PROMASTER3500 (14 images)

### RENAULT (6 images)
- KANGOO (6 images)

### TOYOTA (12 images)
- HIACE (12 images)

### VW (41 images)
- CADDYVAN (6 images)
- CRAFTER5.0 (28 images)
- EUROVANDIESEL (7 images)

## Regenerating the Collection

If you add new images to `public/detail-glass`, regenerate the TypeScript collection:

```bash
node scripts/generateVehicleWindowImages.js
```

This will:
1. Scan all images in `public/detail-glass`
2. Parse each filename according to the naming convention
3. Generate a new `src/data/vehicleWindowImages.ts` file with all parsed data

## Window Codes

Common window codes found in the collection:
- **DB**: Medallion window (small side window)
- **DD**: Front door window
- **DQ**: Side panel/quarter window
- **FD**: Front door (alternative code)
- **FQ**: Quarter panel window (alternative code)
- **FB**: Fixed window/medallion

## Common Descriptions

- `PUERTA-DELANTERA-DERECHA`: Front right door
- `PUERTA-DELANTERA-IZQUIERDA`: Front left door
- `COSTADO-TRASERO-DERECHO`: Rear right side
- `COSTADO-TRASERO-IZQUIERDO`: Rear left side
- `COSTADO-CENTRAL`: Central side panel
- `MEDALLON`: Medallion window
- `TRASERA`: Rear window
