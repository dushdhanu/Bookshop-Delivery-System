const fs = require('fs');
let html = fs.readFileSync('customer/profile.html', 'utf8');

const target = `                const data = {
                    firstName: document.getElementById('firstName').value,
                    lastName: document.getElementById('lastName').value,
                    email: document.getElementById('email').value,
                    phone: document.getElementById('phone').value,
                    birthDate: document.getElementById('birthDate').value,
                    profilePhoto: currentPhotoUrl
                };

                fetch('/api/profile', {`;

const newContent = `                const data = {
                    firstName: document.getElementById('firstName').value,
                    lastName: document.getElementById('lastName').value,
                    email: document.getElementById('email').value,
                    phone: document.getElementById('phone').value,
                    birthDate: document.getElementById('birthDate').value,
                    profilePhoto: currentPhotoUrl
                };

                // Save to localStorage
                localStorage.setItem('currentUser', JSON.stringify({
                    email: data.email,
                    first_name: data.firstName,
                    last_name: data.lastName,
                    phone: data.phone,
                    birth_date: data.birthDate,
                    profile_photo: data.profilePhoto
                }));

                fetch('/api/profile', {`;

if (html.includes(target)) {
    html = html.replace(target, newContent);
    fs.writeFileSync('customer/profile.html', html);
    console.log('Update save function replaced');
} else {
    console.log('Target not found');
}
