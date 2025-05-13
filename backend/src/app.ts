import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db';
import { env } from './config/env';
import routes from './routes';
import { errorHandler } from './utils/errorHandler';
import { Request, Response, NextFunction } from 'express';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Connect to database
connectDB();

// Middlewares
app.use(cors({
  origin: env.CORS_ORIGIN,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser(env.COOKIE_SECRET));

// Routes
app.use('/api', routes);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Error handler middleware
// Error handler middleware
interface ErrorHandler {
  (err: any, req: Request, res: Response, next: NextFunction): void;
}

const errorHandlerMiddleware: ErrorHandler = (err, req, res, next) => errorHandler(err, req, res, next);

app.use(errorHandlerMiddleware);

// Start server
const PORT = env.PORT;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
