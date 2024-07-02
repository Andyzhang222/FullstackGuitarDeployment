import express from 'express';
import protectedRoute from './routes/protectedRoute';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api', protectedRoute);

export default app;