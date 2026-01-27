document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    loadProfile();

    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            updateProfile();
        });
    }

    const imageInput = document.getElementById('profileImageInput');
    if (imageInput) {
        imageInput.addEventListener('change', uploadImage);
    }
});

async function loadProfile() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/users/profile', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const data = await response.json();

            // Populate Basic Fields
            document.getElementById('firstName').value = data.firstName || '';
            document.getElementById('lastName').value = data.lastName || '';
            document.getElementById('email').value = data.email || '';
            document.getElementById('phone').value = data.phone || '';
            document.getElementById('address').value = data.address || '';
            document.getElementById('birthDate').value = data.birthDate || '';

            // Populate Delivery Person Specific Fields
            if (document.getElementById('vehicleType')) {
                document.getElementById('vehicleType').value = data.vehicleType || '';
            }
            if (document.getElementById('licensePlate')) {
                document.getElementById('licensePlate').value = data.licensePlate || '';
            }
            if (document.getElementById('deliveryArea')) {
                document.getElementById('deliveryArea').value = data.deliveryArea || '';
            }

            // Set Profile Image
            if (data.profileImage) {
                document.getElementById('profileDisplay').src = data.profileImage;
            }
        } else if (response.status === 401) {
            window.location.href = 'login.html';
        }
    } catch (error) {
        console.error('Error loading profile:', error);
    }
}

async function updateProfile() {
    const token = localStorage.getItem('token');

    // Construct the payload including delivery-specific details
    const profileData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        birthDate: document.getElementById('birthDate').value,
        vehicleType: document.getElementById('vehicleType') ? document.getElementById('vehicleType').value : null,
        licensePlate: document.getElementById('licensePlate') ? document.getElementById('licensePlate').value : null,
        deliveryArea: document.getElementById('deliveryArea') ? document.getElementById('deliveryArea').value : null
    };

    try {
        const response = await fetch('/api/users/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(profileData)
        });

        if (response.ok) {
            alert('Profile updated successfully!');
            loadProfile(); // Reload to show updated data
        } else {
            const error = await response.json();
            alert('Update failed: ' + (error.error || 'Unknown error'));
        }
    } catch (error) {
        console.error('Error updating profile:', error);
        alert('An error occurred. Please check your connection.');
    }
}

async function uploadImage(event) {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/users/profile/image', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        if (response.ok) {
            const data = await response.json();
            document.getElementById('profileDisplay').src = data.imageUrl;
            alert('Profile image updated!');
        } else {
            alert('Image upload failed.');
        }
    } catch (error) {
        console.error('Error uploading image:', error);
    }
}