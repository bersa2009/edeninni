#!/usr/bin/env node

/**
 * Test script to verify project setup
 */

const fs = require('fs');
const path = require('path');

const requiredFiles = [
  'package.json',
  'app.json',
  'tsconfig.json',
  'babel.config.js',
  'metro.config.js',
  'app/_layout.tsx',
  'app/index.tsx',
  'app/analyze/index.tsx',
  'app/analyze/analyzing.tsx',
  'app/analyze/result.tsx',
  'components/index.ts',
  'components/buttons/Button.tsx',
  'components/buttons/MicButton.tsx',
  'components/layout/BannerInfo.tsx',
  'components/layout/ErrorBoundary.tsx',
  'components/cards/ResultRow.tsx',
  'components/ui/ProgressRing.tsx',
  'app/recommendations/index.tsx',
  'lib/api.ts',
  'lib/storage.ts',
  'docs/FLOW_DIAGRAM.md',
  'ai/AiService.ts',
  'ai/audio.ts',
  'types/index.ts',
  'lib/theme.ts',
  'lib/nav.ts',
  'lib/i18n.ts',
  'i18n/tr.json',
];

console.log('🔍 Checking project structure...\n');

let allFilesExist = true;

requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  const exists = fs.existsSync(filePath);
  
  console.log(`${exists ? '✅' : '❌'} ${file}`);
  
  if (!exists) {
    allFilesExist = false;
  }
});

console.log('\n📊 Summary:');
console.log(`Total files checked: ${requiredFiles.length}`);
console.log(`Files found: ${requiredFiles.filter(file => fs.existsSync(path.join(__dirname, '..', file))).length}`);

if (allFilesExist) {
  console.log('\n🎉 All required files are present!');
  console.log('\n📋 Next steps:');
  console.log('1. Run `npm install` to install dependencies');
  console.log('2. Add app assets to the assets/ directory');
  console.log('3. Run `npm start` to start the development server');
  console.log('4. Test the app on iOS/Android simulator');
} else {
  console.log('\n⚠️  Some files are missing. Please check the project structure.');
  process.exit(1);
}

console.log('\n🤖 AI Integration Notes:');
console.log('- Current implementation uses mock data in ai/AiService.ts');
console.log('- Replace with TensorFlow Lite or PyTorch Mobile for production');
console.log('- Audio preprocessing will be needed for real model integration');

console.log('\n🎨 UI Features:');
console.log('- Pastel color theme with accessibility compliance');
console.log('- Turkish localization ready');
console.log('- Responsive design for different screen sizes');
console.log('- Microphone permissions handled');

console.log('\n✨ Project is ready for development!');