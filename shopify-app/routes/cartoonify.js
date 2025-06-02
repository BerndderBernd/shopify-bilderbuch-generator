const express = require('express');
const router = express.Router();
const { cartoonifyImage } = require('../services/imageService');

router.post('/', async (req, res) => {
  try {
    const { image } = req.body; // ✅ image ist der base64-String vom Frontend
    const cartoonUrl = await cartoonifyImage(image); // ➤ cartoonUrl ist die URL vom DeepAI-Server
    console.log('✅ Cartoon URL:', cartoonUrl);
    res.json({ image_url: cartoonUrl }); // ✅ Rückgabe für Frontend
  } catch (err) {
    console.error('❌ Fehler bei cartoonify:', err.response?.data || err.message);
    res.status(500).json({ error: 'Fehler bei Cartoonify' });
  }
});

module.exports = router;
