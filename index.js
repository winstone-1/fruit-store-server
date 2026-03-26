import express from 'express';
import dotenv from 'dotenv';
import Fruit from './models/Fruit.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;



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

app.post('/api/fruits', express.json(), (req, res) => {
  const { name, price, quantity } = req.body;
  const newFruit = new Fruit({ name, price, quantity });

  newFruit.save()
    .then((fruit) => {
      res.status(201).json(fruit);
    })
    .catch((error) => {
      console.error('Error saving fruit:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

app.put('/api/fruits/:id', express.json(), (req, res) => {
  const { id } = req.params;
  const { name, price, quantity } = req.body;

  Fruit.findByIdAndUpdate(id, { name, price, quantity }, { new: true })
    .then((fruit) => {
      if (!fruit) {
        return res.status(404).json({ error: 'Fruit not found' });
      }
      res.json(fruit);
    })
    .catch((error) => {
      console.error('Error updating fruit:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

app.delete('/api/fruits/:id', (req, res) => {
  const { id } = req.params;

  Fruit.findByIdAndDelete(id)
    .then((fruit) => {
      if (!fruit) {
        return res.status(404).json({ error: 'Fruit not found' });
      }
      res.json({ message: 'Fruit deleted successfully' });
    })
    .catch((error) => {
      console.error('Error deleting fruit:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});