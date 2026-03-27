import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import fruitRoutes from './routes/fruitRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors'

dotenv.config();

const app = express();
app.use(express.json());

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://fruit-store-client.vercel.app'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']

}));
connectDB();

const PORT = process.env.PORT || 3000;

app.use('/api/', fruitRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});