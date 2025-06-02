const express = require('express');
const cors = require('cors');
const path = require('path');

// 🔌 Route-Imports
const adminRoutes = require('./routes/admin');
const cartoonRoutes = require('./routes/cartoonify');
const textRoutes = require('./routes/textgen');
const pdfExport = require('./routes/pdfExport');

const app = express();

// 🔐 Middlewares
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// 🛣️ API-Routen
app.use('/admin', adminRoutes);
app.use('/api/cartoonify', cartoonRoutes);
app.use('/api/textgen', textRoutes);
app.use('/api/export/pdf', pdfExport);

// 📁 Statische Dateien
app.use('/output', express.static(path.join(__dirname, '../output')));
app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.use(express.static('public'));

// 🌐 Frontend-Fallback für React Router
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/dist/index.html'));
});

// 🚀 Server starten
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server läuft auf Port ${PORT}`);
});
