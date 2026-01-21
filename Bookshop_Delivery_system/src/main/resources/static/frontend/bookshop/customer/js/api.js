const API_BASE_URL = 'http://localhost:8080/api';

// 1. Check Authentication
function checkAuth() {
    const token = localStorage.getItem('jwt_token');
    if (!token) {
        alert('You are not logged in!');
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// 2. Authenticated Fetch Helper
async function authenticatedFetch(endpoint, options = {}) {
    const token = localStorage.getItem('jwt_token');

    let url = endpoint;
    if (!endpoint.startsWith('http')) {
        url = `${API_BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers
    };

    // Remove Content-Type if sending FormData (Multipart)
    if (options.body instanceof FormData) {
        delete headers['Content-Type'];
    }

    const response = await fetch(url, { ...options, headers });

    if (response.status === 401 || response.status === 403) {
        console.error('Auth Error:', response.status);
        localStorage.removeItem('jwt_token');
        window.location.href = 'login.html';
        throw new Error('Unauthorized or Forbidden');
    }

    return response;
}

// 3. Update Profile
async function updateProfile() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address') ? document.getElementById('address').value : "";

    try {
        const response = await authenticatedFetch('/users/profile', {
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