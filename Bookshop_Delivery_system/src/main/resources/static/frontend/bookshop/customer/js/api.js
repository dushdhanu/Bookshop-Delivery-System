const API_BASE_URL = 'http://localhost:8080/api';

// 1. Check Authentication (Matches what orders.js calls)
function checkAuth() {
    const token = localStorage.getItem('jwt_token'); // FIXED: Matches auth.js
    if (!token) {
        alert('You are not logged in!');
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// 2. Authenticated Fetch Helper
async function authenticatedFetch(endpoint, options = {}) {
    const token = localStorage.getItem('jwt_token'); // FIXED: Matches auth.js

    // Helper to handle URL (supports both "/api/..." and "http://...")
    let url = endpoint;
    if (!endpoint.startsWith('http')) {
        url = `http://localhost:8080${endpoint}`;
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers
    };

    const response = await fetch(url, { ...options, headers });

    // Handle Session Expiry
    if (response.status === 401) {
        alert('Session expired. Please login again.');
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('user_role');
        localStorage.removeItem('user_email');
        window.location.href = 'login.html';
        throw new Error('Unauthorized');
    }

    return response;
}

// 3. Update Profile Function (Updated to use authenticatedFetch)
async function updateProfile() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address') ? document.getElementById('address').value : "";

    try {
        const response = await authenticatedFetch('/api/users/profile', {
            method: 'PUT',
            body: JSON.stringify({ firstName, lastName, phone, address })
        });

        if (response.ok) {
            alert('Profile updated successfully!');
        } else {
            alert('Failed to update profile.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}