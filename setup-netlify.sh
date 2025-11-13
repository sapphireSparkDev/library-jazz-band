#!/bin/bash

echo "Setting up Netlify deployment dependencies..."

# Install the new server dependencies
npm install express cors multer serverless-http

echo "Dependencies installed successfully!"
echo ""
echo "Next steps:"
echo "1. Push your changes to GitHub"
echo "2. Connect your repository to Netlify"
echo "3. Set VITE_ADMIN_PASSWORD environment variable in Netlify"
echo "4. Deploy!"

# Make the script executable
chmod +x setup-netlify.sh