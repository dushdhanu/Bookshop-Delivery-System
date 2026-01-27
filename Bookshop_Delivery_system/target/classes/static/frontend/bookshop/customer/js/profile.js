document.addEventListener('DOMContentLoaded', function() {
    loadUserProfile();

    // 1. Personal Information Form Listener
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            updateUserProfile();
        });
    }

    // 2. Change Password Form Listener
    const passwordForm = document.getElementById('passwordForm');
    if (passwordForm) {
        passwordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            changePassword();
        });
    }

    // 3. Preferences Form Listener
    const preferencesForm = document.getElementById('preferencesForm');
    if (preferencesForm) {
        preferencesForm.addEventListener('submit', function(e) {
            e.preventDefault();
            updatePreferences();
        });
    }

    // 4. Image Upload Listener
    const imageInput = document.getElementById('profileImageInput');
    if (imageInput) {
        imageInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                uploadProfileImage(this.files[0]);
            }
        });
    }

    // 5. Delete Account Button Listener
    const deleteBtn = document.getElementById('deleteAccountBtn');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', deleteAccount);
    }
});

function loadUserProfile() {
    const token = localStorage.getItem('jwt_token');
    if (!token) {
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
            if (!response.ok) throw new Error('Failed to load profile');
            return response.json();
        })
        .then(user => {
            // Populate form fields
            document.getElementById('firstName').value = user.firstName || '';
            document.getElementById('lastName').value = user.lastName || '';
            document.getElementById('email').value = user.email || '';
            document.getElementById('phone').value = user.phone || '';
            if(document.getElementById('birthDate')) document.getElementById('birthDate').value = user.birthDate || '';
            if(document.getElementById('address')) document.getElementById('address').value = user.address || '';

            // Update display elements
            if(document.getElementById('displayName')) document.getElementById('displayName').textContent = `${user.firstName} ${user.lastName}`;
            if(document.getElementById('displayEmail')) document.getElementById('displayEmail').textContent = user.email;

            // FIXED: Clean the image path to prevent double slashes
            if (user.profileImage && document.getElementById('profileImagePreview')) {
                const cleanPath = user.profileImage.startsWith('/') ? user.profileImage.substring(1) : user.profileImage;
                document.getElementById('profileImagePreview').src = 'http://localhost:8080/' + cleanPath;
            }

            // Populate preferences
            if(document.getElementById('newsletter')) document.getElementById('newsletter').checked = user.newsletter || false;
            if(document.getElementById('promotions')) document.getElementById('promotions').checked = user.promotions || false;
            if(document.getElementById('notifications')) document.getElementById('notifications').checked = user.notifications || false;
            if(document.getElementById('preferredCategory')) document.getElementById('preferredCategory').value = user.preferredCategory || '';
        })
        .catch(error => console.error('Error loading profile:', error));
}

function updateUserProfile() {
    const token = localStorage.getItem('jwt_token');
    if (!token) {
        alert("Session expired. Please login again.");
        window.location.href = 'login.html';
        return;
    }

    const updatedData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        birthDate: document.getElementById('birthDate') ? document.getElementById('birthDate').value : null
    };

    const addressInput = document.getElementById('address');
    if(addressInput) updatedData.address = addressInput.value;

    fetch('http://localhost:8080/api/users/profile', {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
    })
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson ? await response.json() : null;

            if (!response.ok) {
                throw new Error(data?.error || data?.message || 'Failed to update profile');
            }
            alert('Profile updated successfully!');
            loadUserProfile();
        })
        .catch(error => alert(error.message));
}

function updatePreferences() {
    const token = localStorage.getItem('jwt_token');
    const updatedData = {
        newsletter: document.getElementById('newsletter').checked,
        promotions: document.getElementById('promotions').checked,
        notifications: document.getElementById('notifications').checked,
        preferredCategory: document.getElementById('preferredCategory').value
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
            if (!response.ok) throw new Error('Failed to update preferences');
            return response.json();
        })
        .then(() => alert('Preferences saved successfully!'))
        .catch(error => alert('Failed to save preferences.'));
}

function changePassword() {
    const token = localStorage.getItem('jwt_token');
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (newPassword !== confirmPassword) {
        alert("New passwords do not match!");
        return;
    }

    fetch('http://localhost:8080/api/users/password', {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ currentPassword, newPassword })
    })
        .then(async response => {
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Failed to change password');
            alert('Password changed successfully!');
            document.getElementById('passwordForm').reset();
        })
        .catch(error => alert(error.message));
}

function deleteAccount() {
    if (!confirm("Are you sure you want to delete your account? This action cannot be undone.")) return;
    const token = localStorage.getItem('jwt_token');

    fetch('http://localhost:8080/api/users/profile', {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + token }
    })
        .then(async response => {
            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                throw new Error(data.error || 'Failed to delete account');
            }
            alert("Your account has been deleted.");
            localStorage.removeItem('jwt_token');
            window.location.href = 'index.html';
        })
        .catch(error => alert(error.message));
}

function uploadProfileImage(file) {
    const token = localStorage.getItem('jwt_token');
    const formData = new FormData();
    formData.append('file', file);

    fetch('http://localhost:8080/api/users/profile/image', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + token },
        body: formData
    })
        .then(response => {
            if (!response.ok) throw new Error('Upload failed');
            return response.json();
        })
        .then(data => {
            alert('Image uploaded successfully!');
            // FIXED: Clean the URL for immediate preview update
            if (data.imageUrl && document.getElementById('profileImagePreview')) {
                const cleanPath = data.imageUrl.startsWith('/') ? data.imageUrl.substring(1) : data.imageUrl;
                document.getElementById('profileImagePreview').src = 'http://localhost:8080/' + cleanPath;
            }
        })
        .catch(err => {
            console.error('Error uploading image:', err);
            alert('Failed to upload image.');
        });
}