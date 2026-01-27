// File: .../static/frontend/bookshop/bookseller/js/api.js

const API_BASE_URL = 'http://localhost:8080/api';

/**
 * Generates consistent headers including the JWT token from localStorage
 */
function getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };
}

/**
 * Fetches profile data from the backend and populates UI elements
 */
async function loadProfile() {
    try {
        const response = await fetch(`${API_BASE_URL}/users/profile`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (!response.ok) throw new Error('Failed to fetch profile');

        const data = await response.json();

        // Update Text labels in the sidebar/header
        const storeLabel = document.getElementById('displayStoreName');
        const emailLabel = document.getElementById('displayEmail');
        if (storeLabel) storeLabel.textContent = data.storeName || 'My Store';
        if (emailLabel) emailLabel.textContent = data.email;

        // Populate Form Input fields
        if (document.getElementById('storeName')) document.getElementById('storeName').value = data.storeName || '';
        if (document.getElementById('ownerName')) {
            document.getElementById('ownerName').value = `${data.firstName || ''} ${data.lastName || ''}`.trim();
        }
        if (document.getElementById('email')) document.getElementById('email').value = data.email || '';
        if (document.getElementById('phone')) document.getElementById('phone').value = data.phone || '';
        if (document.getElementById('address')) document.getElementById('address').value = data.address || '';

        // Handle Profile Image display
        const initialsDiv = document.getElementById('profileInitials');
        if (data.profileImage && initialsDiv) {
            initialsDiv.style.backgroundImage = `url('${data.profileImage}')`;
            initialsDiv.style.backgroundSize = 'cover';
            initialsDiv.textContent = '';
        }
    } catch (error) {
        console.error('Error in loadProfile:', error);
    }
}