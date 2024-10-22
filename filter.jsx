const fs = require('fs-extra');  // For file system operations
const path = require('path');    // For handling file paths
const { execSync } = require('child_process');  // To run shell commands

// Load environment variables from the specific .env file
require('dotenv').config({
  path: `.env.${process.env.REACT_APP_ENV}`,  // Load .env based on passed environment
});

// Get the build folder name from environment variables
const buildFolder = process.env.REACT_APP_BUILD_FOLDER || 'build';  // Default to 'build' if not specified

// Full path to the build directory
const buildPath = path.resolve(__dirname, buildFolder);

try {
  // Remove existing build folder if it exists
  console.log(`Cleaning up existing build folder: ${buildPath}`);
  fs.removeSync(buildPath);

  // Run the React build command
  console.log('Running React build...');
  execSync('react-scripts build', { stdio: 'inherit' });

  // Move the newly created build folder to the specified build directory
  console.log(`Moving build output to folder: ${buildFolder}`);
  fs.moveSync(path.resolve(__dirname, 'build'), buildPath, { overwrite: true });

  console.log(`Build completed successfully and moved to: ${buildPath}`);
} catch (error) {
  console.error('Error during the build process:', error);
  process.exit(1);
}
