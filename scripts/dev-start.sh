#!/bin/bash

# Development startup script for Bebek Ses Çözücü

echo "🍼 Starting Bebek Ses Çözücü Development Environment"
echo "=================================================="

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies"
        exit 1
    fi
    echo "✅ Dependencies installed successfully"
else
    echo "✅ Dependencies already installed"
fi

# Check if assets directory has placeholder files
if [ ! -f "assets/icon.png" ]; then
    echo "⚠️  Warning: App assets are missing"
    echo "   Please add the following files to assets/ directory:"
    echo "   - icon.png (1024x1024)"
    echo "   - splash.png (1242x2436)"
    echo "   - adaptive-icon.png (1024x1024)"
    echo "   - favicon.png (32x32)"
    echo ""
fi

# Verify project structure
echo "🔍 Verifying project structure..."
node scripts/test-setup.js
if [ $? -ne 0 ]; then
    echo "❌ Project structure verification failed"
    exit 1
fi

echo ""
echo "🚀 Starting Expo development server..."
echo "   After the server starts:"
echo "   - Press 'i' for iOS simulator"
echo "   - Press 'a' for Android emulator"
echo "   - Press 'w' for web browser"
echo "   - Press 'r' to reload"
echo "   - Press 'q' to quit"
echo ""

# Start the development server
npm start