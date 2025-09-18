#!/usr/bin/env node

/**
 * Test script to verify website functionality after Vue 3 migration
 * Run with: node test-website.js
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Testing Website Functionality...\n');

// Test 1: Check if animated background is disabled
console.log('1. Checking animated background is disabled...');
const appVue = fs.readFileSync('src/App.vue', 'utf8');
if (appVue.includes('<!-- <AnimatedBackground')) {
  console.log('✅ Animated background is disabled');
} else {
  console.log('❌ Animated background is still enabled');
}

// Test 2: Check if Vue 2 filters are removed
console.log('\n2. Checking Vue 2 filters are removed...');
const publicationBlock = fs.readFileSync('src/components/PublicationBlock.vue', 'utf8');
if (publicationBlock.includes('filters:') || publicationBlock.includes('| quotes')) {
  console.log('❌ Vue 2 filters still present');
} else if (publicationBlock.includes('quotedTitle()')) {
  console.log('✅ Vue 2 filters converted to computed properties');
} else {
  console.log('⚠️  No filters found (may be correct)');
}

// Test 3: Check if ProjectsMenu bug is fixed
console.log('\n3. Checking ProjectsMenu bug fix...');
const projectsMenu = fs.readFileSync('src/components/ProjectsMenu.vue', 'utf8');
if (projectsMenu.includes('this.tag')) {
  console.log('❌ ProjectsMenu bug still present');
} else if (projectsMenu.includes('[tag]')) {
  console.log('✅ ProjectsMenu bug fixed');
} else {
  console.log('⚠️  ProjectsMenu code changed (check manually)');
}

// Test 4: Check if all components exist
console.log('\n4. Checking all components exist...');
const components = [
  'src/components/Navbar.vue',
  'src/components/About.vue',
  'src/components/Publications.vue',
  'src/components/Experience.vue',
  'src/components/Projects.vue',
  'src/components/Contact.vue',
  'src/components/Modal.vue',
  'src/components/ProjectCard.vue',
  'src/components/ProjectModal.vue',
  'src/components/ProjectsMenu.vue',
  'src/components/PublicationBlock.vue',
  'src/components/PublicationModal.vue',
  'src/components/ExperienceDetails.vue',
  'src/components/ExperienceBlock.vue',
  'src/components/ExperienceTimeline.vue'
];

let missingComponents = [];
components.forEach(component => {
  if (!fs.existsSync(component)) {
    missingComponents.push(component);
  }
});

if (missingComponents.length === 0) {
  console.log('✅ All components exist');
} else {
  console.log('❌ Missing components:', missingComponents);
}

// Test 5: Check if data files exist
console.log('\n5. Checking data files exist...');
const dataFiles = [
  'src/data/projects.json',
  'src/data/experiences.json',
  'src/data/publications.json'
];

let missingDataFiles = [];
dataFiles.forEach(file => {
  if (!fs.existsSync(file)) {
    missingDataFiles.push(file);
  }
});

if (missingDataFiles.length === 0) {
  console.log('✅ All data files exist');
} else {
  console.log('❌ Missing data files:', missingDataFiles);
}

// Test 6: Check if build output exists
console.log('\n6. Checking build output...');
if (fs.existsSync('dist/index.html')) {
  console.log('✅ Build output exists');
} else {
  console.log('❌ Build output missing - run npm run build');
}

console.log('\n🎉 Website functionality test completed!');
console.log('\nTo test the website:');
console.log('1. Run: npm run dev');
console.log('2. Open http://localhost:3000 in your browser');
console.log('3. Test navigation, modals, and all interactive features');
console.log('4. Verify responsive design works on different screen sizes');
