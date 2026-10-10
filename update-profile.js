const fs = require('fs');
let html = fs.readFileSync('customer/profile.html', 'utf8');

const newContent = `            let currentPhotoUrl = '';

            // 1. Fetch initial data on load
            const localUser = JSON.parse(localStorage.getItem('currentUser'));
            if (localUser) {
                document.getElementById('firstName').value = localUser.first_name || '';
                document.getElementById('lastName').value = localUser.last_name || '';
                document.getElementById('email').value = localUser.email || '';
                document.getElementById('phone').value = localUser.phone || '';
                document.getElementById('birthDate').value = localUser.birth_date || '';
                if (localUser.profile_photo) {
                    currentPhotoUrl = localUser.profile_photo;
                    updateUIPhoto(localUser.profile_photo);
                }
                updateUIText(localUser.first_name, localUser.last_name, localUser.email);
            }

            fetch('/api/profile')
                .then(res => res.json())
                .then(data => {
                    if (data.success && data.data && !localUser) {
                        const user = data.data;
                        document.getElementById('firstName').value = user.first_name || '';
                        document.getElementById('lastName').value = user.last_name || '';
                        document.getElementById('email').value = user.email || '';
                        document.getElementById('phone').value = user.phone || '';
                        document.getElementById('birthDate').value = user.birth_date || '';
                        if (user.profile_photo) {
                            currentPhotoUrl = user.profile_photo;
                            updateUIPhoto(user.profile_photo);
                        }
                        updateUIText(user.first_name, user.last_name, user.email);
                    }
                })
                .catch(err => console.log('API not available, using local storage.'));`;

const startIdx = html.indexOf("let currentPhotoUrl = '';");
const endIdx = html.indexOf("// 2. Handle Photo Selection");
if (startIdx !== -1 && endIdx !== -1) {
    html = html.substring(0, startIdx) + newContent + '\n\n            ' + html.substring(endIdx);
    fs.writeFileSync('customer/profile.html', html);
    console.log('Replaced successfully');
} else {
    console.log('Could not find indices');
}
