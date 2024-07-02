#!/bin/bash

# Function to clean up processes on exit
cleanup() {
  echo "Cleaning up..."
  # Kill background jobs (frontend and backend)
  kill $(jobs -p)
  # Kill processes on ports 3000 and 3001
  lsof -ti tcp:3000 | xargs kill -9
  lsof -ti tcp:3001 | xargs kill -9
  echo "Frontend on port 3000 has been stopped"
  echo "Backend on port 3001 has been stopped"
  exit
}

# Trap EXIT signal to run cleanup function
trap cleanup EXIT

# Start frontend
cd frontend
echo "Starting frontend on port 3000..."
yarn start &
cd ..

# Start backend
cd backend
echo "Starting backend on port 3001..."
yarn start &
cd ..

# Wait for all background jobs to complete
wait