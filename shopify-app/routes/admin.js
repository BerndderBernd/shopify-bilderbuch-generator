const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// 📄 Liste aller PDFs im output-Verzeichnis
router.get('/pdfs', (req, res) => {
  const dir = path.resolve(__dirname, '../../output');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.pdf'));
  const pdfs = files.map(f => ({
    name: f,
    url: `/output/${f}`
  }));

  res.json(pdfs);
});

// ✅ Druckfreigabe eines bestimmten PDFs
router.post('/approve', (req, res) => {
  const { filename } = req.body;
  console.log(`📦 Freigegeben zur Druckweiterleitung: ${filename}`);
  res.json({ success: true, message: `${filename} freigegeben` });
});

module.exports = router;
