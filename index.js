import express from 'express';

const app = express();
const PORT = 3000;

const fruits = [
    { id: 1, name: 'Apple', price: 0.5 },
    { id: 2, name: 'Banana', price: 0.3 },
    { id: 3, name: 'Orange', price: 0.8 },
    { id: 4, name: 'Grapes', price: 2.0 },
];


app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Fruit Store API' });
});

app.get('/api/fruits', (req, res) => {
  res.json(fruits);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});