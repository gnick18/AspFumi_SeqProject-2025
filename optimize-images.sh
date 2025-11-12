#!/bin/bash

# Leadership Images Optimization Script
# This script optimizes all leadership photos for web use

echo "🖼️  Optimizing Leadership Images..."

# Change to the leadership directory
cd public/leadership

# Function to optimize an image
optimize_image() {
    local input_file="$1"
    local output_file="${input_file%.*}.webp"
    
    if [[ -f "$input_file" ]]; then
        echo "Optimizing: $input_file"
        
        # Check if ImageMagick is installed
        if command -v magick &> /dev/null; then
            # Use ImageMagick to optimize
            magick "$input_file" -resize 256x256^ -gravity center -extent 256x256 -quality 90 "$output_file"
            echo "✅ Created: $output_file"
        elif command -v convert &> /dev/null; then
            # Fallback to convert command
            convert "$input_file" -resize 256x256^ -gravity center -extent 256x256 -quality 90 "$output_file"
            echo "✅ Created: $output_file"
        else
            echo "⚠️  ImageMagick not found. Please install it or use an online tool."
            echo "   Visit: https://squoosh.app to optimize $input_file"
        fi
    fi
}

# Optimize all leadership photos
optimize_image "Amelia_Barber.jpg"
optimize_image "Dante_Calise.jpeg"
optimize_image "Grant_Nickles.JPG"
optimize_image "Emile_GluckThaler.png"

echo ""
echo "✨ Optimization complete!"
echo ""
echo "Next steps:"
echo "1. If WebP files were created, update src/app/page.tsx to use them"
echo "2. Otherwise, manually optimize using https://squoosh.app"
echo "3. Test the images on the homepage"
echo ""