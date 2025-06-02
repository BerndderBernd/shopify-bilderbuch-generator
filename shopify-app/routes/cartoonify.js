const express = require('express');
const router = express.Router();
const { cartoonifyImage } = require('../services/imageService');

router.post('/', async (req, res) => {
  const { image } = req.body;

  if (!image) {
    return res.status(400).json({ error: 'Kein Bild empfangen' });
  }

  try {
    const cartoonUrl = await cartoonifyImage(image);
    res.json({ image_url: cartoonUrl });
  } catch (err) {
    console.error('❌ Fehler bei cartoonify:', err.message);
    res.status(500).json({ error: 'Fehler bei Cartoonify' });
  }
});

module.exports = router;
