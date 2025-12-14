async function updateProfile() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address') ? document.getElementById('address').value : "";

    const userProfileDto = {
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        address: address
    };

    try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch('http://localhost:8080/api/users/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(userProfileDto)
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