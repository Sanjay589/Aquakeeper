import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import apiRouter from './routes/api';
import loggerMiddleware from './middleware/logger';
import notFoundMiddleware from './middleware/notFound';
import errorMiddleware from './middleware/error';

// Load environment variables
dotenv.config();

const app = express();

// Security headers with Helmet
app.use(helmet());

// CORS configuration from environment variable
const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
app.use(cors({
  origin: clientUrl,
  credentials: true
}));

// Rate limiting middleware to protect the API
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again after 15 minutes.'
  }
});
app.use('/api/', apiLimiter);

// JSON request-size limit
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Custom request logging middleware
app.use(loggerMiddleware);

// API Routes
app.use('/api', apiRouter);

// Catch-all Not Found Route
app.use(notFoundMiddleware);

// Centralized Error-handling Middleware
app.use(errorMiddleware);

export default app;
