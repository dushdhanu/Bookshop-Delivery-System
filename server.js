const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files from the root directory
// This means /customer/index.html will just work
app.use(express.static(path.join(__dirname, '')));

// Database Setup (SQLite for easy zero-config local development)
const db = new sqlite3.Database('./bookshop.db', (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        
        // Initialize simple Users table for our upcoming Authentication phase
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role TEXT NOT NULL
        )`);
    }
});

// Basic API Endpoint Test
app.get('/api/status', (req, res) => {
    res.json({ status: 'success', message: 'Backend is running correctly!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`- Customer Portal: http://localhost:${PORT}/customer/index.html`);
    console.log(`- Admin Portal: http://localhost:${PORT}/admin/`);
});
