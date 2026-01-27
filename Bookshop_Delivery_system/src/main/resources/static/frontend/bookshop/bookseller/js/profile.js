document.addEventListener('DOMContentLoaded', () => {
    // Initial data load when the page is ready
    loadProfile();

    // --- NEW: Logo Upload Logic ---
    const imageInput = document.getElementById('imageInput');
    if (imageInput) {
        imageInput.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            // Check file size (2MB limit)
            if (file.size > 2 * 1024 * 1024) {
                alert('File is too large. Please select an image under 2MB.');
                return;
            }

            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await fetch(`${API_BASE_URL}/users/profile/image`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
                    },
                    body: formData
                });

                if (response.ok) {
                    alert('Logo updated successfully!');
                    loadProfile(); // Refresh UI to show new image
                } else {
                    const errorData = await response.json();
                    alert(errorData.error || 'Failed to upload image.');
                }
            } catch (error) {
                console.error('Upload error:', error);
                alert('Connection error while uploading logo.');
            }
        });
    }

    // 1. Store Info Form Submission Logic
    const storeForm = document.getElementById('storeForm');
    if (storeForm) {
        storeForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const fullName = document.getElementById('ownerName').value.trim();
            const nameParts = fullName.split(' ');

            const formData = {
                firstName: nameParts[0] || '',
                lastName: nameParts.slice(1).join(' ') || '',
                phone: document.getElementById('phone').value,
                address: document.getElementById('address').value,
                storeName: document.getElementById('storeName') ? document.getElementById('storeName').value : null
            };

            await updateProfileData(formData);
        });
    }

    // 2. Store Preferences Form Submission Logic
    const preferencesForm = document.getElementById('preferencesForm');
    if (preferencesForm) {
        preferencesForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const preferenceData = {
                notifications: document.getElementById('notifications').checked,
                promotions: document.getElementById('promotions').checked,
                newsletter: document.getElementById('newsletter').checked,
                preferredCategory: document.getElementById('primaryCategory').value
            };

            await updateProfileData(preferenceData);
        });
    }

    // 3. Permanent Account Deletion Logic
    const deleteBtn = document.getElementById('deleteAccountBtn');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', async () => {
            if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
                try {
                    const response = await fetch(`${API_BASE_URL}/users/profile`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
                        }
                    });

                    if (response.ok) {
                        alert('Account successfully deleted.');
                        localStorage.clear();
                        window.location.href = '../customer/index.html';
                    } else {
                        const data = await response.json();
                        alert(data.error || 'Failed to delete account.');
                    }
                } catch (error) {
                    console.error('Error during deletion:', error);
                    alert('An error occurred. Please try again later.');
                }
            }
        });
    }
});

/**
 * Shared function to send updates to the backend
 */
async function updateProfileData(payload) {
    try {
        const response = await fetch(`${API_BASE_URL}/users/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            alert('Settings updated successfully!');
            loadProfile();
        } else {
            const data = await response.json();
            alert(data.error || 'Update failed. Please check your inputs.');
        }
    } catch (error) {
        console.error('Network error during update:', error);
        alert('Connection error. Is the backend server running?');
    }
}

async function loadProfile() {
    const token = localStorage.getItem('jwt_token');

    if (!token) {
        window.location.href = '../login.html';
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/users/profile`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
            const user = await response.json();

            // Populate Input Fields
            if (document.getElementById('ownerName')) {
                document.getElementById('ownerName').value = `${user.firstName || ''} ${user.lastName || ''}`.trim();
            }
            if (document.getElementById('storeName')) {
                document.getElementById('storeName').value = user.storeName || '';
            }
            if (document.getElementById('email')) {
                document.getElementById('email').value = user.email || '';
            }
            if (document.getElementById('phone')) {
                document.getElementById('phone').value = user.phone || '';
            }
            if (document.getElementById('address')) {
                document.getElementById('address').value = user.address || '';
            }

            // Populate Preference Fields
            if (document.getElementById('notifications')) {
                document.getElementById('notifications').checked = user.notifications || false;
            }
            if (document.getElementById('promotions')) {
                document.getElementById('promotions').checked = user.promotions || false;
            }
            if (document.getElementById('newsletter')) {
                document.getElementById('newsletter').checked = user.newsletter || false;
            }
            if (document.getElementById('primaryCategory')) {
                document.getElementById('primaryCategory').value = user.preferredCategory || '';
            }

            // Handle Logo Display
            if (user.profileImage) {
                const profileImgPlaceholder = document.getElementById('profileInitials');
                profileImgPlaceholder.innerHTML = `<img src="${user.profileImage}" style="width:100%; height:100%; border-radius:50%; object-fit:cover;">`;
            }

            // Update Labels
            if (document.getElementById('displayEmail')) {
                document.getElementById('displayEmail').textContent = user.email || 'N/A';
            }
            if (document.getElementById('displayStoreName')) {
                document.getElementById('displayStoreName').textContent = user.storeName || 'Store Name';
            }

        } else if (response.status === 401) {
            localStorage.clear();
            window.location.href = '../login.html';
        }
    } catch (error) {
        console.error('Error loading profile:', error);
    }
}