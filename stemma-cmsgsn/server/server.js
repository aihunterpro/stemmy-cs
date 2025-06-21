const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const validator = require('validator');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Create/connect to SQLite database
const dbPath = path.join(__dirname, 'subscribers.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to SQLite database');
    // Performance tuning for production
    db.run('PRAGMA journal_mode = WAL;');
    db.run('PRAGMA synchronous = NORMAL;');
    // Create table if it doesn't exist
    db.run(`
      CREATE TABLE IF NOT EXISTS subscribers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }
});

// API endpoint to handle email subscription
app.post('/api/subscribe', (req, res) => {
  let email = req.body.email;
  if (!email) {
    return res.status(400).json({ error: 'Invalid email address' });
  }
  email = email.trim().toLowerCase();
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }
  const query = 'INSERT INTO subscribers (email) VALUES (?)';
  db.run(query, [email], function(err) {
    if (err) {
      if (err.message.includes('UNIQUE constraint failed')) {
        return res.status(409).json({ error: 'Email already registered' });
      }
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    
    res.json({ 
      success: true, 
      message: 'Thank you for subscribing!',
      id: this.lastID 
    });
  });
});

// API endpoint to get all subscribers (for testing)
/* app.get('/api/subscribers', (req, res) => {
  db.all('SELECT * FROM subscribers', [], (err, rows) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(rows);
  });
}); */

// Serve static front-end assets
const staticPath = path.join(__dirname, '../dist');
app.use(express.static(staticPath));

// Fallback for client-side routing (non-API GETs)
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    return res.sendFile(path.join(staticPath, 'index.html'));
  }
  res.status(404).json({ error: 'Not found' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Closed the database connection.');
    process.exit(0);
  });
}); 