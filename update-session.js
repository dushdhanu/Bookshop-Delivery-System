const fs = require('fs');
let text = fs.readFileSync('session.js', 'utf8');

const target = `async function checkUserSession() {
    try {
        const res = await fetch('/api/profile');`;

const newText = `async function checkUserSession() {
    try {
        const localUser = JSON.parse(localStorage.getItem('currentUser'));
        if (localUser) {
            return { isLoggedIn: true, user: localUser };
        }
        
        const res = await fetch('/api/profile');`;

text = text.replace(target, newText);
fs.writeFileSync('session.js', text);
console.log('Replaced in session.js');
