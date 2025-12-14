// Helper to get the JWT token from storage (assuming you saved it as 'accessToken' on login)
function getAuthToken() {
    return localStorage.getItem('accessToken');
}

// Helper to make authenticated requests
async function authFetch(url, options = {}) {
    const token = getAuthToken();
    const headers = options.headers || {};

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    options.headers = headers;

    const response = await fetch(url, options);

    if (response.status === 401 || response.status === 403) {
        alert('Session expired. Please login again.');
        window.location.href = '/frontend/bookshop/customer/login.html'; // Adjust path as needed
        return null;
    }

    return response;
}