// Import necessary modules
import express, { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

// Create a new router instance
const router = express.Router();

// Define the /tokens route
router.post('/', [
  // Validate incoming request body
  check('accessToken', 'Access Token is required').not().isEmpty(),
  check('refreshToken', 'Refresh Token is required').not().isEmpty(),
  check('idToken', 'ID Token is required').not().isEmpty()
], (req: Request, res: Response) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); // Return validation errors if any
  }

  // Destructure tokens from the request body
  const { accessToken, refreshToken, idToken } = req.body;

  // Log received tokens
  console.log('Received ID Token:', idToken);
  console.log('Received Access Token:', accessToken);
  console.log('Received Refresh Token:', refreshToken);

  try {
    // Decode and verify the ID token
    const decodedIdToken = jwt.decode(idToken);
    console.log('Decoded ID Token:', decodedIdToken);

    // Placeholder: Find or create user in the database using decoded token info
    // const { sub, email } = decodedIdToken;
    // const user = await findOrCreateUser(sub, email);

    // Send success response
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    // Log and return error response
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Error logging in user' });
  }
});

// Define the /login route
router.post('/login', [
  // Validate incoming request body
  check('accessToken', 'Access Token is required').not().isEmpty(),
  check('refreshToken', 'Refresh Token is required').not().isEmpty(),
  check('idToken', 'ID Token is required').not().isEmpty()
], (req: Request, res: Response) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); // Return validation errors if any
  }

  // Destructure tokens from the request body
  const { accessToken, refreshToken, idToken } = req.body;

  // Log received tokens
  console.log('Received ID Token:', idToken);
  console.log('Received Access Token:', accessToken);
  console.log('Received Refresh Token:', refreshToken);

  try {
    // Decode and verify the ID token
    const decodedIdToken = jwt.decode(idToken);
    console.log('Decoded ID Token:', decodedIdToken);

    // Placeholder: Find or create user in the database using decoded token info
    // const { sub, email } = decodedIdToken;
    // const user = await findOrCreateUser(sub, email);

    // Send success response
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    // Log and return error response
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Error logging in user' });
  }
});

// Export the router
export default router;