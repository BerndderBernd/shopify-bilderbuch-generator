const express = require('express');
const router = express.Router();
const { generatePDF } = require('../utils/pdfGenerator');

router.post('/', async (req, res) => {
  const { pages, title } = req.body;

  try {
    const pdfPath = await generatePDF(pages, title);
    res.download(pdfPath); // sendet als Download
  } catch (error) {
    console.error('❌ PDF-Fehler:', error);
    res.status(500).json({ error: 'PDF-Generierung fehlgeschlagen' });
  }
});

module.exports = router;
