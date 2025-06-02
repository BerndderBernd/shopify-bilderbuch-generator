const express = require('express');
const router = express.Router();
const { cartoonifyImage } = require('../services/imageService');

router.post('/', async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ error: 'Kein Bild gesendet' });
    }

    const cartoonImage = await cartoonifyImage(image);

    console.log('✅ Cartoon erstellt:', cartoonImage);

    res.json({ image_url: cartoonImage }); // 🔥 Richtig zurückgeben
  } catch (err) {
    console.error('❌ Fehler bei cartoonify:', err.message);
    res.status(500).json({ error: 'Fehler bei Cartoonify' });
  }
});

module.exports = router;
