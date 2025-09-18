#!/usr/bin/env node

/**
 * Simple test script to verify the Vue 3 + Vite migration
 * Run with: node test-migration.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧪 Testing Vue 3 + Vite Migration...\n');

// Test 1: Check if package.json has correct dependencies
console.log('1. Checking package.json dependencies...');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

const requiredDeps = ['vue', 'vite', '@vitejs/plugin-vue'];
const missingDeps = requiredDeps.filter(dep => !packageJson.dependencies[dep] && !packageJson.devDependencies[dep]);

if (missingDeps.length === 0) {
  console.log('✅ All required dependencies found');
} else {
  console.log('❌ Missing dependencies:', missingDeps);
}

// Test 2: Check if Vue 3 is being used
console.log('\n2. Checking Vue version...');
if (packageJson.dependencies.vue && packageJson.dependencies.vue.startsWith('^3.')) {
  console.log('✅ Vue 3 detected');
} else {
  console.log('❌ Vue 3 not detected');
}

// Test 3: Check if Vite config exists
console.log('\n3. Checking Vite configuration...');
if (fs.existsSync('vite.config.js')) {
  console.log('✅ vite.config.js found');
} else {
  console.log('❌ vite.config.js not found');
}

// Test 4: Check if old Vue CLI files are removed
console.log('\n4. Checking old Vue CLI files are removed...');
const oldFiles = ['vue.config.js', 'babel.config.js'];
const removedFiles = oldFiles.filter(file => !fs.existsSync(file));

if (removedFiles.length === oldFiles.length) {
  console.log('✅ Old Vue CLI files removed');
} else {
  console.log('❌ Some old files still exist:', oldFiles.filter(file => fs.existsSync(file)));
}

// Test 5: Check if index.html is in root
console.log('\n5. Checking index.html location...');
if (fs.existsSync('index.html')) {
  console.log('✅ index.html found in root directory');
} else {
  console.log('❌ index.html not found in root directory');
}

// Test 6: Check if P5Canvas component exists
console.log('\n6. Checking P5Canvas component...');
if (fs.existsSync('src/components/P5Canvas.vue')) {
  console.log('✅ P5Canvas component found');
} else {
  console.log('❌ P5Canvas component not found');
}

// Test 7: Check if main.js uses Vue 3 API
console.log('\n7. Checking main.js uses Vue 3 API...');
const mainJs = fs.readFileSync('src/main.js', 'utf8');
if (mainJs.includes('createApp') && mainJs.includes('app.mount')) {
  console.log('✅ main.js uses Vue 3 createApp API');
} else {
  console.log('❌ main.js does not use Vue 3 API');
}

console.log('\n🎉 Migration test completed!');
console.log('\nTo test the application:');
console.log('1. Run: npm run dev');
console.log('2. Open http://localhost:3000 in your browser');
console.log('3. Test the animated background and all interactive features');
