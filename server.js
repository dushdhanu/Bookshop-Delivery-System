const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const multer = require('multer'); // Added for file uploads
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

// Multer configuration for profile photos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        // Create a unique filename
        cb(null, 'profile-' + Date.now() + path.extname(file.originalname))
    }
});
const upload = multer({ storage: storage });

// Middleware
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files and uploads
app.use(express.static(path.join(__dirname, '')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database Setup
const db = new sqlite3.Database('./bookshop.db', (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        
        // Initialize simple Users table
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name TEXT,
            last_name TEXT,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role TEXT NOT NULL,
            phone TEXT,
            birth_date TEXT,
            profile_photo TEXT
        )`, (err) => {
            if (!err) {
                // Ensure the mock user exists so the frontend sees them as logged in
                db.get("SELECT id FROM users WHERE id = 1", (err, row) => {
                    if (!err && !row) {
                        db.run("INSERT INTO users (id, first_name, last_name, email, password, role, phone, birth_date) VALUES (1, 'chaminda', 'Dissanayake', 'chamind3@example.com', 'password', 'customer', '(123) 456-7890', '01/01/1990')");
                    }
                });
            }
        });
    }
});

// Mock user for testing (since we don't have login logic yet)
// We will just use user ID 1 for now
app.post('/api/profile', (req, res) => {
    const { firstName, lastName, email, phone, birthDate, profilePhoto } = req.body;
    
    // In a real app, we get user ID from session/token. Here we assume ID = 1.
    const userId = 1;

    // Check if user exists, if not create a dummy one, otherwise update
    db.get("SELECT id FROM users WHERE id = ?", [userId], (err, row) => {
        if (!row) {
            db.run(`INSERT INTO users (id, first_name, last_name, email, password, role, phone, birth_date, profile_photo) 
                    VALUES (?, ?, ?, ?, 'password', 'customer', ?, ?, ?)`, 
                [userId, firstName, lastName, email, phone, birthDate, profilePhoto], 
                (err) => {
                    if(err) return res.status(500).json({error: err.message});
                    res.json({ success: true, message: "Profile created" });
                }
            );
        } else {
            db.run(`UPDATE users SET first_name = ?, last_name = ?, email = ?, phone = ?, birth_date = ?, profile_photo = ? WHERE id = ?`,
                [firstName, lastName, email, phone, birthDate, profilePhoto, userId],
                (err) => {
                    if(err) return res.status(500).json({error: err.message});
                    res.json({ success: true, message: "Profile updated" });
                }
            );
        }
    });
});

// Mock session state
let currentLoggedInUserId = 1; // Start logged in as user 1 for demo

// Get profile
app.get('/api/profile', (req, res) => {
    if (!currentLoggedInUserId) {
        return res.json({ success: true, data: null });
    }
    db.get("SELECT * FROM users WHERE id = ?", [currentLoggedInUserId], (err, row) => {
        if (err) return res.status(500).json({error: err.message});
        res.json({ success: true, data: row || null });
    });
});

// Mock login/logout
app.post('/api/logout', (req, res) => {
    currentLoggedInUserId = null;
    res.json({ success: true });
});

app.post('/api/login', (req, res) => {
    currentLoggedInUserId = 1;
    res.json({ success: true });
});

// Photo upload endpoint
app.post('/api/profile/upload', upload.single('photo'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    // Return the URL where the image can be accessed
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ success: true, photoUrl: fileUrl });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`- Customer Portal: http://localhost:${PORT}/customer/index.html`);
    console.log(`- Admin Portal: http://localhost:${PORT}/admin/`);
});
// Nodemon trigger
