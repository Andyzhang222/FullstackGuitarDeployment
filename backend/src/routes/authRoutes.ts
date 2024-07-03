import { Router } from 'express';
import { verifyToken } from '../controllers/authController';

const router = Router();

router.post('/login', verifyToken);

export default router;