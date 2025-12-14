document.addEventListener('DOMContentLoaded', function() {
    loadUserProfile();

    const profileForm = document.getElementById('profileForm'); // Matches the ID in your HTML
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            updateUserProfile();
        });
    }

    // --- IMAGE UPLOAD LISTENER ---
    const imageInput = document.getElementById('profileImageInput');
    if (imageInput) {
        imageInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                uploadProfileImage(this.files[0]);
            }
        });
    }
});

function loadUserProfile() {
    // FIX: Use 'jwt_token' to match what is saved in auth.js
    const token = localStorage.getItem('jwt_token');

    if (!token) {
        // If no token found, redirect to login
        console.log("No token found, redirecting to login.");
        window.location.href = 'login.html';
        return;
    }

    fetch('http://localhost:8080/api/users/profile', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.status === 401 || response.status === 403) {
                // Token might be expired
                localStorage.removeItem('jwt_token');
                window.location.href = 'login.html';
                throw new Error('Session expired');
            }
            if (!response.ok) throw new Error('Failed to load profile');
            return response.json();
        })
        .then(user => {
            // Populate form fields
            document.getElementById('firstName').value = user.firstName || '';
            document.getElementById('lastName').value = user.lastName || '';
            document.getElementById('email').value = user.email || '';
            document.getElementById('phone').value = user.phone || '';
            document.getElementById('address').value = user.address || '';

            // Handle Birth Date
            if (document.getElementById('birthDate')) {
                document.getElementById('birthDate').value = user.birthDate || '';
            }

            // Update Display Names
            if (document.getElementById('displayName')) {
                document.getElementById('displayName').textContent = (user.firstName || '') + ' ' + (user.lastName || '');
            }
            if (document.getElementById('displayEmail')) {
                document.getElementById('displayEmail').textContent = user.email || '';
            }

            // Load Profile Image
            if (user.profileImage) {
                const imgPreview = document.getElementById('profileImagePreview');
                if (imgPreview) {
                    imgPreview.src = 'http://localhost:8080' + user.profileImage;
                }
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function updateUserProfile() {
    // FIX: Use 'jwt_token'
    const token = localStorage.getItem('jwt_token');

    const updatedData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        birthDate: document.getElementById('birthDate') ? document.getElementById('birthDate').value : null
    };

    fetch('http://localhost:8080/api/users/profile', {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
    })
        .then(response => {
            if (!response.ok) throw new Error('Failed to update profile');
            return response.json();
        })
        .then(data => {
            alert('Profile updated successfully!');
            loadUserProfile(); // Refresh data to update display names etc.
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to update profile. Please try again.');
        });
}

function uploadProfileImage(file) {
    // FIX: Use 'jwt_token'
    const token = localStorage.getItem('jwt_token');
    const formData = new FormData();
    formData.append('file', file);

    fetch('http://localhost:8080/api/users/profile/image', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token
            // Content-Type is set automatically by browser for FormData
        },
        body: formData
    })
        .then(response => {
            if (!response.ok) throw new Error('Failed to upload image');
            return response.json();
        })
        .then(data => {
            alert('Image uploaded successfully!');
            // Update the preview immediately
            const imgPreview = document.getElementById('profileImagePreview');
            if (imgPreview) {
                imgPreview.src = 'http://localhost:8080' + data.imageUrl;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to upload image.');
        });
}