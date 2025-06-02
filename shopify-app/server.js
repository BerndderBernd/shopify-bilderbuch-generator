const express = require('express');
const cors = require('cors');
const path = require('path');

const adminRoutes = require('./routes/admin');
const cartoonRoutes = require('./routes/cartoonify');
const textRoutes = require('./routes/textgen');
const pdfExport = require('./routes/pdfExport');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/admin', adminRoutes);
app.use('/api/cartoonify', cartoonRoutes);
app.use('/api/textgen', textRoutes);
app.use('/api/export/pdf', pdfExport);

app.use('/output', express.static(path.join(__dirname, '../output')));
app.use(express.static('public'));

const PORT = process.env.PORT || 5000;


// Serve static frontend (React/Vite build)
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Fallback für alle non-API routes (React Router support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});
app.listen(PORT, () => console.log(`✅ Server läuft auf Port ${PORT}`));
