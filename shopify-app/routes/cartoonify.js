const express = require('express');
const router = express.Router();
const { cartoonifyImage } = require('../services/imageService');

router.post('/', async (req, res) => {
  try {
    const { image } = req.body; // 🟢 ACHTUNG: nicht base64Image – dein Frontend sendet `image`
    const cartoonUrl = await cartoonifyImage(image);
    res.json({ image_url: cartoonUrl }); // ✅ Korrekt: cartoonUrl ist der Rückgabewert
  } catch (err) {
    console.error('❌ Fehler bei cartoonify:', err);
    res.status(500).json({ error: 'Fehler bei Cartoonify' });
  }
});

module.exports = router;
