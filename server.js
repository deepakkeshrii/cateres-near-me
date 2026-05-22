const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;
const DATA_FILE = path.join(__dirname, 'caterers.json');

app.use(cors());
app.use(express.json());

function readData() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, '[]');
    return [];
  }
  const raw = fs.readFileSync(DATA_FILE, 'utf8');
  return raw ? JSON.parse(raw) : [];
}

function writeData(list) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2));
}

app.get('/api/caterers', (req, res) => {
  let list = readData();
  const { search, minPrice, maxPrice } = req.query;

  if (search) {
    const q = search.toLowerCase();
    list = list.filter(c => c.name.toLowerCase().includes(q));
  }
  if (minPrice) {
    list = list.filter(c => c.pricePerPlate >= Number(minPrice));
  }
  if (maxPrice) {
    list = list.filter(c => c.pricePerPlate <= Number(maxPrice));
  }

  res.json(list);
});

app.get('/api/caterers/:id', (req, res) => {
  const list = readData();
  const found = list.find(c => c.id === req.params.id);
  if (!found) {
    return res.status(404).json({ error: 'Caterer not found' });
  }
  res.json(found);
});

app.post('/api/caterers', (req, res) => {
  const { name, location, pricePerPlate, cuisines, rating } = req.body || {};
  const errors = [];

  if (!name || typeof name !== 'string') errors.push('name is required');
  if (!location || typeof location !== 'string') errors.push('location is required');
  if (!pricePerPlate || typeof pricePerPlate !== 'number' || pricePerPlate <= 0) {
    errors.push('pricePerPlate must be a number greater than 0');
  }
  if (!Array.isArray(cuisines) || cuisines.length === 0) {
    errors.push('cuisines must be a non-empty array');
  }
  if (typeof rating !== 'number' || rating < 0 || rating > 5) {
    errors.push('rating must be between 0 and 5');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const list = readData();
  const lastId = list.length ? Number(list[list.length - 1].id) : 0;

  const newCaterer = {
    id: String(lastId + 1),
    name: name.trim(),
    location: location.trim(),
    pricePerPlate,
    cuisines,
    rating,
  };

  list.push(newCaterer);
  writeData(list);

  res.status(201).json(newCaterer);
});

app.listen(PORT, () => {
  console.log('API running on http://localhost:' + PORT);
});
