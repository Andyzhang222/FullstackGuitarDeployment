import express from 'express';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'You have accessed the protected route', user: req.user });
});

router.get('/user', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

export default router;