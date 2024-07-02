// Import necessary libraries and configurations
import React from 'react';
import { createRoot } from 'react-dom/client';
import awsconfig from './aws-exports';
import App from './App';
import './index.css';

// Configure AWS Amplify when DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
  if (window.Amplify) {
    window.Amplify.configure(awsconfig);
    console.log('Amplify configured in index.tsx');
  } else {
    console.error('Failed to load AWS Amplify in index.tsx');
  }
});

// Get root container and render the App component
const container = document.getElementById('root');
if (container) {
  createRoot(container).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Root container not found');
}