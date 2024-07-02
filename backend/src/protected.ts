import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/protected', (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).send('Access Denied: No Token Provided!');
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
    res.status(200).send('Protected Data Accessed');
  } catch (error) {
    res.status(400).send('Invalid Token');
  }
});

export default router;