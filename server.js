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
// Profile endpoints with email lookup & persistence support
app.post('/api/profile', (req, res) => {
    const { firstName, lastName, email, phone, birthDate, profilePhoto } = req.body;
    
    // Check if user exists by email or id
    db.get("SELECT id, profile_photo FROM users WHERE email = ? OR id = ?", [email || '', currentLoggedInUserId || 1], (err, row) => {
        const photoToSave = profilePhoto !== undefined ? profilePhoto : (row ? row.profile_photo : null);
        if (!row) {
            db.run(`INSERT INTO users (first_name, last_name, email, password, role, phone, birth_date, profile_photo) 
                    VALUES (?, ?, ?, 'password', 'customer', ?, ?, ?)`, 
                [firstName, lastName, email, phone, birthDate, photoToSave], 
                function(err) {
                    if(err) return res.status(500).json({error: err.message});
                    res.json({ success: true, message: "Profile created" });
                }
            );
        } else {
            db.run(`UPDATE users SET first_name = ?, last_name = ?, email = COALESCE(?, email), phone = ?, birth_date = ?, profile_photo = COALESCE(?, profile_photo) WHERE id = ?`,
                [firstName, lastName, email, phone, birthDate, photoToSave, row.id],
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

// Get profile (supports email query parameter or session id)
app.get('/api/profile', (req, res) => {
    const email = req.query.email;
    if (email) {
        db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
            if (err) return res.status(500).json({ error: err.message });
            if (row) return res.json({ success: true, data: row });
            db.get("SELECT * FROM users WHERE id = ?", [currentLoggedInUserId || 1], (err2, row2) => {
                if (err2) return res.status(500).json({ error: err2.message });
                res.json({ success: true, data: row2 || null });
            });
        });
        return;
    }
    if (!currentLoggedInUserId) {
        return res.json({ success: true, data: null });
    }
    db.get("SELECT * FROM users WHERE id = ?", [currentLoggedInUserId], (err, row) => {
        if (err) return res.status(500).json({error: err.message});
        res.json({ success: true, data: row || null });
    });
});

// Get public users list (strictly non-sensitive fields: no passwords)
app.get('/api/users', (req, res) => {
    db.all("SELECT id, first_name, last_name, email, role, phone, birth_date, profile_photo FROM users", (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, users: rows || [] });
    });
});

// Register user endpoint
app.post('/api/register', (req, res) => {
    const { name, email, password, role, phone } = req.body;
    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required' });
    }
    const nameParts = (name || '').trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';
    const userRole = role || 'customer';
    const userPhone = phone || '';

    db.run(
        `INSERT OR IGNORE INTO users (first_name, last_name, email, password, role, phone) VALUES (?, ?, ?, ?, ?, ?)`,
        [firstName, lastName, email, password || 'password', userRole, userPhone],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ success: true, message: 'User registered successfully', userId: this.lastID });
        }
    );
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
    const email = req.body && req.body.email;
    if (email) {
        db.run("UPDATE users SET profile_photo = ? WHERE email = ?", [fileUrl, email], (err) => {
            if (err) console.error("Error updating user photo in db:", err.message);
        });
    }
    res.json({ success: true, photoUrl: fileUrl });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`- Customer Portal: http://localhost:${PORT}/customer/index.html`);
    console.log(`- Admin Portal: http://localhost:${PORT}/admin/`);
});
// Nodemon trigger
