const express = require('express');
const router = express.Router();
const { generateStoryText } = require('../services/textService');

router.post('/', async (req, res) => {
  try {
    const { prompt } = req.body;
    const suggestion = await generateStoryText(prompt);
    res.json({ suggestion });
  } catch (err) {
    console.error('❌ Fehler bei Textgenerierung:', err);
    res.status(500).json({ error: 'Fehler bei Textgenerierung' });
  }
});

module.exports = router;
