// API JavaScript for Bookseller Operations

document.addEventListener('DOMContentLoaded', function() {
    // Handle edit book form submission
    const editBookForm = document.getElementById('editBookForm');
    if (editBookForm) {
        editBookForm.addEventListener('submit', function(e) {
            e.preventDefault();
            updateBook();
        });
    }
    
    // Handle add book form submission
    const addBookForm = document.getElementById('addBookForm');
    if (addBookForm) {
        addBookForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addBook();
        });
    }
    
    // Handle cancel button for edit form
    const editCancelBtn = document.getElementById('cancelBtn');
    if (editCancelBtn) {
        editCancelBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
                window.location.href = 'books.html';
            }
        });
    }
    
    // Handle cancel button for add form
    const addCancelBtn = document.getElementById('cancelBtn');
    if (addCancelBtn && !editBookForm) {
        addCancelBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
                window.location.href = 'books.html';
            }
        });
    }
    
    // Handle delete button
    const deleteBtn = document.getElementById('deleteBtn');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', function() {
            deleteBook();
        });
    }
    
    // Handle image preview
    const bookImageInput = document.getElementById('bookImage');
    if (bookImageInput) {
        bookImageInput.addEventListener('change', function() {
            previewImage(this);
        });
    }
    
    // Handle store form submission
    const storeForm = document.getElementById('storeForm');
    if (storeForm) {
        storeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            updateStoreInfo();
        });
    }
    
    // Handle password form submission
    const passwordForm = document.getElementById('passwordForm');
    if (passwordForm) {
        passwordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            updatePassword();
        });
    }
    
    // Handle preferences form submission
    const preferencesForm = document.getElementById('preferencesForm');
    if (preferencesForm) {
        preferencesForm.addEventListener('submit', function(e) {
            e.preventDefault();
            updatePreferences();
        });
    }
});

// Update book function
function updateBook() {
    // Validate form
    if (!validateBookForm()) {
        return;
    }
    
    // Get form data
    const formData = new FormData(document.getElementById('editBookForm'));
    
    // In a real application, you would send this data to your server
    console.log('Updating book with data:', Object.fromEntries(formData));
    
    // Show loading state
    const submitButton = document.querySelector('#editBookForm .btn-primary');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Updating...';
    submitButton.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Show success message
        showAlert('Book updated successfully!', 'success');
        
        // In a real app, you might redirect or update the UI
        // window.location.href = 'books.html';
    }, 1500);
}

// Add book function
function addBook() {
    // Validate form
    if (!validateBookForm()) {
        return;
    }
    
    // Get form data
    const formData = new FormData(document.getElementById('addBookForm'));
    
    // In a real application, you would send this data to your server
    console.log('Adding new book with data:', Object.fromEntries(formData));
    
    // Show loading state
    const submitButton = document.querySelector('#addBookForm .btn-primary');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Adding Book...';
    submitButton.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Show success message
        showAlert('Book added successfully!', 'success');
        
        // Reset form
        document.getElementById('addBookForm').reset();
        
        // In a real app, you might redirect to the books list
        // window.location.href = 'books.html';
    }, 1500);
}

// Delete book function
function deleteBook() {
    if (confirm('Are you sure you want to delete this book? This action cannot be undone.')) {
        // In a real application, you would send a delete request to your server
        console.log('Deleting book');
        
        // Show loading state
        const deleteButton = document.getElementById('deleteBtn');
        const originalText = deleteButton.textContent;
        deleteButton.textContent = 'Deleting...';
        deleteButton.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            // Reset button
            deleteButton.textContent = originalText;
            deleteButton.disabled = false;
            
            // Show success message
            showAlert('Book deleted successfully!', 'success');
            
            // In a real app, you would redirect to the books list
            // window.location.href = 'books.html';
        }, 1000);
    }
}

// Preview image function
function previewImage(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            // In a real application, you would update the image preview
            console.log('Image preview updated');
            
            // Show a simple alert for demo purposes
            showAlert('Image selected for upload', 'info');
        }
        
        reader.readAsDataURL(input.files[0]);
    }
}

// Update store information function
function updateStoreInfo() {
    // Get form data
    const storeName = document.getElementById('storeName').value.trim();
    const ownerName = document.getElementById('ownerName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const website = document.getElementById('website').value.trim();
    const address = document.getElementById('address').value.trim();
    
    // Validate required fields
    if (!storeName || !ownerName || !email || !phone) {
        showAlert('Please fill in all required fields', 'danger');
        return;
    }
    
    // Validate email
    if (!validateEmail(email)) {
        showAlert('Please enter a valid email address', 'danger');
        return;
    }
    
    // In a real application, you would send this data to your server
    console.log('Updating store info with data:', {
        storeName, ownerName, email, phone, website, address
    });
    
    // Show loading state
    const submitButton = document.querySelector('#storeForm .btn-primary');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Saving...';
    submitButton.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Show success message
        showAlert('Store information updated successfully!', 'success');
    }, 1500);
}

// Update password function
function updatePassword() {
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Basic validation
    if (!currentPassword || !newPassword || !confirmPassword) {
        showAlert('Please fill in all password fields', 'danger');
        return;
    }
    
    // Password validation
    if (newPassword.length < 6) {
        showAlert('New password must be at least 6 characters long', 'danger');
        return;
    }
    
    // Confirm password match
    if (newPassword !== confirmPassword) {
        showAlert('New passwords do not match', 'danger');
        return;
    }
    
    // In a real application, you would send this data to your server
    console.log('Updating password');
    
    // Show loading state
    const submitButton = document.querySelector('#passwordForm .btn-primary');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Updating...';
    submitButton.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Show success message
        showAlert('Password updated successfully!', 'success');
        
        // Reset form
        document.getElementById('passwordForm').reset();
    }, 1500);
}

// Update preferences function
function updatePreferences() {
    const notifications = document.getElementById('notifications').checked;
    const promotions = document.getElementById('promotions').checked;
    const newsletter = document.getElementById('newsletter').checked;
    const primaryCategory = document.getElementById('primaryCategory').value;
    const shippingMethod = document.getElementById('shippingMethod').value;
    
    // In a real application, you would send this data to your server
    console.log('Updating preferences with data:', {
        notifications, promotions, newsletter, primaryCategory, shippingMethod
    });
    
    // Show loading state
    const submitButton = document.querySelector('#preferencesForm .btn-primary');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Saving...';
    submitButton.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Show success message
        showAlert('Preferences updated successfully!', 'success');
    }, 1500);
}

// Show alert messages
function showAlert(message, type = 'success') {
    // Remove existing alerts
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type === 'info' ? 'warning' : type}`;
    alertDiv.textContent = message;
    
    // Insert at the top of the form container
    const formContainer = document.querySelector('.form-container') || document.querySelector('.container');
    if (formContainer) {
        formContainer.insertBefore(alertDiv, formContainer.firstChild);
    }
    
    // Remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

// Form validation
function validateBookForm() {
    const title = document.getElementById('bookTitle').value.trim();
    const author = document.getElementById('author').value.trim();
    const category = document.getElementById('category').value;
    const price = document.getElementById('price').value;
    const stock = document.getElementById('stock').value;
    const bookType = document.getElementById('bookType').value;
    
    // Validate required fields
    if (!title) {
        showAlert('Book title is required', 'danger');
        return false;
    }
    
    if (!author) {
        showAlert('Author is required', 'danger');
        return false;
    }
    
    if (!category) {
        showAlert('Please select a category', 'danger');
        return false;
    }
    
    if (!bookType) {
        showAlert('Please select a book type', 'danger');
        return false;
    }
    
    if (!price || parseFloat(price) <= 0) {
        showAlert('Please enter a valid price', 'danger');
        return false;
    }
    
    if (!stock || parseInt(stock) < 0) {
        showAlert('Please enter a valid stock quantity', 'danger');
        return false;
    }
    
    return true;
}

// Email validation helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
// API JavaScript for Bookseller/Admin Operations

// Add book function
async function addBook() {
    if (!validateBookForm()) return;

    const form = document.getElementById('addBookForm');
    const formData = new FormData(form);
    // Ensure input names in HTML match backend @RequestParam:
    // bookTitle, author, price, stock, category, bookImage

    // Handle Checkboxes manually if needed, or rely on form
    // Note: Checkbox 'featured' might send "on" or nothing. Backend expects boolean.
    // You might need to manually append if the backend is strict about "true"/"false"
    formData.set('featured', document.getElementById('featured').checked);
    formData.set('active', document.getElementById('active').checked);

    const submitButton = form.querySelector('.btn-primary');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Adding Book...';
    submitButton.disabled = true;

    try {
        const response = await fetch('http://localhost:8080/api/books', {
            method: 'POST',
            headers: getAuthHeaders(), // Authorization only (no Content-Type for FormData)
            body: formData
        });

        if (response.ok) {
            showAlert('Book added successfully!', 'success');
            form.reset();
            // Optionally redirect
            // window.location.href = 'books.html';
        } else {
            showAlert('Failed to add book', 'danger');
        }
    } catch (error) {
        console.error('Error:', error);
        showAlert('Error communicating with server', 'danger');
    } finally {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
}

// Update book function (Assuming you add PUT endpoint later)
async function updateBook() {
    // Similar to addBook, but likely needs an ID and PUT method
    console.log("Update logic to be implemented based on specific backend ID requirements");
}

// ... Keep existing utility functions (previewImage, validateBookForm) ...