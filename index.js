import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Fruit from './models/Fruit.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Fruit Store API' });
});

app.get('/api/fruits', (req, res) => {
  Fruit.find()
    .then((fruits) => {
      res.json(fruits);
    })
    .catch((error) => {
      console.error('Error fetching fruits:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});