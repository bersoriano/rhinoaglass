# Vehicle Window Images Collection - Summary

## What Was Created

A comprehensive TypeScript collection of all 252 vehicle window images from the `public/detail-glass` folder, with full parsing of the filename naming convention.

## Files Created

### 1. Main Collection File
**`src/data/vehicleWindowImages.ts`** (5,065 lines)
- TypeScript interface defining the structure of vehicle window data
- Parser function to parse filenames according to naming convention
- Array of 252 parsed vehicle window objects
- Helper functions for filtering and searching

### 2. Generator Script
**`scripts/generateVehicleWindowImages.js`**
- Node.js script to regenerate the collection from image files
- Automatically parses all images in `public/detail-glass`
- Run with: `node scripts/generateVehicleWindowImages.js`

### 3. Statistics Script
**`scripts/showVehicleStats.js`**
- Displays summary statistics of the collection
- Shows breakdown by brand and model
- Run with: `node scripts/showVehicleStats.js`

### 4. Documentation
**`src/data/README.md`**
- Complete documentation of the collection
- Usage examples
- Breakdown of all brands and models
- Explanation of naming convention

### 5. Example Usage
**`src/examples/useVehicleWindowImages.example.ts`**
- 15 practical examples of how to use the collection
- Demonstrates filtering, searching, and analysis capabilities

## Collection Statistics

- **Total Images**: 252
- **Total Brands**: 12
- **Total Unique Models**: 30

### Brands Distribution

| Brand | Images | Models |
|-------|--------|--------|
| FORD | 53 | 9 |
| VW | 41 | 3 |
| PEUGEOT | 31 | 4 |
| RAM | 29 | 4 |
| MERCEDES | 25 | 1 |
| FIAT | 23 | 2 |
| TOYOTA | 12 | 1 |
| HYUNDAY | 10 | 2 |
| JACK | 8 | 1 |
| CHEVROLET | 7 | 1 |
| FOTON | 7 | 1 |
| RENAULT | 6 | 1 |

## Filename Naming Convention

Each filename follows this pattern:
```
[brand]-[model]-[startYear]-[endYear]-[windowCode]-[windowNumber]-[size]-[description]
```

### Example Filename Breakdown

`FORD-TRANSIT-CUSTOM-TDI-2016-2021-DB-12236-690X550-MEDALLON-DERECHO.PNG`

- **Brand**: FORD
- **Model**: TRANSIT-CUSTOM-TDI (multi-part model)
- **Start Year**: 2016
- **End Year**: 2021
- **Window Code**: DB (Medallion window)
- **Window Number**: 12236
- **Size**: 690x550 cm
- **Description**: MEDALLON-DERECHO (Right medallion)

## TypeScript Interface

```typescript
interface VehicleWindowImage {
  filename: string;           // Original filename
  brand: string;              // Vehicle brand
  model: string;              // Vehicle model (can be multi-part)
  submodels: string[];        // Array of model parts
  startYear: number;          // Starting year of applicability
  endYear: number;            // Ending year of applicability
  windowCode: string;         // 2-letter window type code
  windowNumber: string;       // Part number
  size: {
    width: number;            // Width in cm
    height: number;           // Height in cm
    raw: string;              // Raw size string
  };
  description: string;        // Description text
  imagePath: string;          // Path to image
}
```

## Usage Examples

### Import the Collection
```typescript
import {
  vehicleWindowImages,
  getUniqueBrands,
  getImagesByBrand,
  searchByDescription
} from '@/data/vehicleWindowImages';
```

### Get All Images
```typescript
const allImages = vehicleWindowImages; // 252 images
```

### Filter by Brand
```typescript
const fordImages = getImagesByBrand('FORD'); // 53 images
```

### Search by Description
```typescript
const frontDoors = searchByDescription('PUERTA-DELANTERA');
```

### Filter by Year Range
```typescript
const recentImages = getImagesByYearRange(2020, 2024);
```

## Window Codes

| Code | Description | Count |
|------|-------------|-------|
| DQ | Quarter/side panel window | ~80 |
| FD | Front door window | ~60 |
| FQ | Fixed quarter window | ~50 |
| DB | Medallion window | ~40 |
| DD | Door window | ~20 |
| FB | Fixed window | ~2 |

## Common Window Descriptions

- **PUERTA-DELANTERA-DERECHA**: Front right door
- **PUERTA-DELANTERA-IZQUIERDA**: Front left door
- **COSTADO-TRASERO-DERECHO**: Rear right side
- **COSTADO-TRASERO-IZQUIERDO**: Rear left side
- **COSTADO-CENTRAL**: Central side panel
- **MEDALLON**: Medallion window
- **TRASERA**: Rear window

## Key Features

1. **Type-Safe**: Full TypeScript support with proper interfaces
2. **Searchable**: Multiple helper functions for filtering and searching
3. **Regenerable**: Script to regenerate collection when images are added
4. **Well-Documented**: Comprehensive README and examples
5. **Complete**: All 252 images parsed and included

## How to Use in Your Application

1. **Import** the collection or helper functions
2. **Filter** by brand, model, year, or description
3. **Display** images using the `imagePath` property
4. **Search** for specific window types or parts

## Maintenance

To update the collection when new images are added:

```bash
node scripts/generateVehicleWindowImages.js
```

This will re-scan `public/detail-glass` and regenerate the TypeScript file.

## Notes

- Some filenames had minor inconsistencies (missing hyphens) but were still parsed successfully
- Window sizes are stored both as parsed numbers and raw strings
- Multi-part model names (e.g., TRANSIT-CUSTOM-TDI) are properly handled with submodels array
- All 252 images were successfully parsed
