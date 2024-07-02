// Import necessary modules
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import tokenRoutes from './routes/tokenRoutes';

// Load environment variables from .env file
dotenv.config();

// Initialize the Express application
const app = express();
const port = process.env.PORT || 3001; // Set the server port, default to 3001 if not specified

// Use middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
app.use(bodyParser.json()); // Parse incoming request bodies in JSON format

// Set up routes
app.use('/api/tokens', tokenRoutes); // Use tokenRoutes for /api/tokens path
app.use('/login', tokenRoutes); // Use tokenRoutes for /login path

// Connect to the database
connectDB(); // Call the function to connect to the database

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`); // Log a message when the server starts
});