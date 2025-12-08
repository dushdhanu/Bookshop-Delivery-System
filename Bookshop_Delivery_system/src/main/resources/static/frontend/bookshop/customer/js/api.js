// Customer API JavaScript for Book Management

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
    const formContainer = document.querySelector('.form-container');
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