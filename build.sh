#!/bin/bash

# Function to clean up processes on exit
cleanup() {
  echo "Cleaning up..."
  # Kill background jobs (frontend and backend)
  kill $(jobs -p)
  echo "Cleanup completed."
  exit
}

# Trap EXIT signal to run cleanup function
trap cleanup EXIT

# Build frontend
cd frontend || { echo "Frontend directory not found"; exit 1; }
echo "Building frontend..."
yarn install && yarn build
if [ $? -ne 0 ]; then
  echo "Frontend build failed!"
  exit 1
fi
echo "Frontend build completed."
cd ..

# Build backend
cd backend || { echo "Backend directory not found"; exit 1; }
echo "Building backend..."
yarn install
if [ $? -ne 0 ]; then
  echo "Backend dependency installation failed!"
  exit 1
fi

# Add additional backend build steps if required (e.g., TypeScript compilation)
if [ -f tsconfig.json ]; then
  echo "Compiling TypeScript for backend..."
  yarn tsc
  if [ $? -ne 0 ]; then
    echo "Backend TypeScript compilation failed!"
    exit 1
  fi
fi
echo "Backend build completed."
cd ..

echo "Build process completed successfully."