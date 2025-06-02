const express = require('express');
const router = express.Router();
const { cartoonifyImage } = require('../services/imageService');

router.post('/', async (req, res) => {
  try {
    const { base64Image } = req.body;
    const cartoonImage = await cartoonifyImage(base64Image);
    res.json({ cartoonImage });
  } catch (err) {
    console.error('❌ Fehler bei cartoonify:', err);
    res.status(500).json({ error: 'Fehler bei Cartoonify' });
  }
});

module.exports = router;
