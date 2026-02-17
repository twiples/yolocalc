const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve specific HTML pages
app.get('/calculator', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'calculator.html'));
});

app.get('/experiences', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'experiences.html'));
});

app.get('/lifemap', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'lifemap.html'));
});

// Fallback to index.html for SPA-style routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`YoloCalc running on port ${PORT}`);
});
