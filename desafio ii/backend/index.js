const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

mongoose.connect('mongodb://localhost:27017/outfits');

const Outfits = mongoose.model('Outfit', {
  store: String,
  description: String,
  photo: String,
  latitude: Number,
  longitude: Number,
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

app.get('/outfits', async (req, res) => {
  const outfits = await Outfits.find();
  res.json(outfits);
});

app.post('/outfits', upload.single('photo'), async (req, res) => {
  const { store, description, latitude, longitude } = req.body;
  const photo = req.file ? req.file.path : null;
  const outfit = new Outfits({ store, description, photo, latitude, longitude });
  await outfit.save();
  res.json(outfit);
});

app.listen(3000, () => console.log('Backend listening on port 3000'));