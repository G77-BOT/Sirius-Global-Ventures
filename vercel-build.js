// This script ensures the build runs with the correct configuration
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Ensure we're using the correct config
const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = require(packageJsonPath);

// Ensure type is commonjs
packageJson.type = 'commonjs';

// Write the updated package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

// Run the build
console.log('Running Next.js build...');
try {
  execSync('next build', { stdio: 'inherit' });
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
