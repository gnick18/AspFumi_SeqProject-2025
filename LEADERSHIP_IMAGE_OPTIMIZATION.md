# Leadership Images Optimization Guide

## Current Issue
Amelia Barber's photo (and potentially others) is rendering with lower quality than expected.

## Root Cause
- Mixed file formats (.jpg, .jpeg, .png, .JPG)
- Images may be too large or improperly compressed
- Display size is 128×128px but source may be much larger

## Recommended Solution: Convert to WebP Format

### Why WebP?
- **25-35% smaller file size** than JPEG
- **Better quality** at the same compression level
- **Lossless and lossy** compression support
- **Supported by all modern browsers**
- **Perfect for profile photos**

### Image Specifications
- **Display Size**: 128×128px (circular container)
- **Optimal Source Size**: 256×256px (2x for Retina displays)
- **Format**: WebP (preferred) or high-quality JPG (90% quality)
- **Aspect Ratio**: 1:1 (square)

### Step-by-Step Optimization

#### Option 1: Using Online Tools (Easiest)
1. Go to **squoosh.app** (Google's free image optimizer)
2. Drag and drop `Amelia_Barber.jpg`
3. Choose **WebP** format
4. Adjust quality to 85-90%
5. Resize to 256×256px
6. Download the optimized file
7. Replace the original file

#### Option 2: Using Command Line (if you have ImageMagick installed)
```bash
# Convert and optimize Amelia's photo
magick Amelia_Barber.jpg -resize 256x256^ -gravity center -extent 256x256 -quality 90 Amelia_Barber.webp

# Or optimize existing JPG
magick Amelia_Barber.jpg -resize 256x256^ -gravity center -extent 256x256 -quality 90 Amelia_Barber_optimized.jpg
```

#### Option 3: Using Photoshop/GIMP
1. Open the image in your preferred editor
2. Resize to 256×256px (Image → Resize → 256×256)
3. Crop to square if needed
4. Export as WebP (File → Export As → WebP)
5. Set quality to 90%
6. Save over the original file

### Files to Optimize
1. ✅ **Amelia_Barber.jpg** (priority - has quality issues)
2. ✅ **Dante_Calise.jpeg** (for consistency)
3. ✅ **Grant_Nickles.JPG** (for consistency)
4. ✅ **Emile_GluckThaler.png** (already optimized format)

### Expected Results
- **Faster page loading** (smaller file sizes)
- **Better image quality** (proper sizing)
- **Consistent appearance** across all leadership photos
- **Better user experience** on slower connections

### Verification Steps
After optimization, verify:
1. Images load quickly on the homepage
2. Quality looks sharp on both regular and Retina displays
3. File sizes are reasonable (aim for <50KB per image)
4. All images maintain their aspect ratio in the circular container

## Quick Win
Start with Amelia's photo first since that's the one with the reported issue. Once you see the improvement, apply the same process to the others for consistency.