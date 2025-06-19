const express = require('express');
const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname)));

// Set up database
const dbPath = path.join(__dirname, 'data/school.db');
const dbDir = path.dirname(dbPath);

// Ensure the data directory exists
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database');
    
    // Create notices table if it doesn't exist
    db.run(`CREATE TABLE IF NOT EXISTS notices (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      category TEXT DEFAULT 'general',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
      if (err) {
        console.error('Error creating notices table', err.message);
      }
    });
  }
});

// Set up gallery directory
const uploadDir = path.join(__dirname, 'uploads/gallery');

// Ensure upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// API routes for public site
app.get('/api/notices', (req, res) => {
  const category = req.query.category;
  
  let query = 'SELECT * FROM notices';
  let params = [];
  
  if (category) {
    query += ' WHERE category = ?';
    params.push(category);
  }
  
  query += ' ORDER BY created_at DESC';
  
  db.all(query, params, (err, notices) => {
    if (err) {
      console.error('Error fetching notices:', err.message);
      return res.status(500).json({ success: false, message: 'Failed to fetch notices' });
    }
    
    res.json({ success: true, notices: notices });
  });
});

app.get('/api/gallery', (req, res) => {
  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      console.error('Error reading gallery directory:', err.message);
      return res.status(500).json({ success: false, message: 'Failed to fetch gallery images' });
    }
    
    // Filter out non-image files
    const images = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
    
    res.json({ success: true, images: images });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});