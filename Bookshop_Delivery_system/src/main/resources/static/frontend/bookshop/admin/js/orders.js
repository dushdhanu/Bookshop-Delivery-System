// Admin Orders Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Search functionality
    const searchInput = document.querySelector('.search-bar .form-input');
    const searchButton = document.querySelector('.search-bar .btn');
    
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                performSearch(searchTerm);
            }
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = searchInput.value.trim();
                if (searchTerm) {
                    performSearch(searchTerm);
                }
            }
        });
    }
    
    // Filter by status
    const statusFilter = document.querySelector('.filter-options select');
    if (statusFilter) {
        statusFilter.addEventListener('change', function() {
            filterByStatus(this.value);
        });
    }
    
    // Handle update buttons
    const updateButtons = document.querySelectorAll('.btn-primary');
    updateButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const orderId = row.cells[0].textContent;
            updateOrderStatus(row, orderId);
        });
    });
    
    // Handle view buttons
    const viewButtons = document.querySelectorAll('.btn-secondary');
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const orderId = row.cells[0].textContent;
            viewOrderDetails(orderId);
        });
    });
    
    // Handle delete order buttons
    const deleteOrderButtons = document.querySelectorAll('.btn-danger');
    deleteOrderButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const orderId = row.cells[0].textContent;
            deleteOrder(row, orderId);
        });
    });
    
    // Handle leave feedback buttons
    const leaveFeedbackButtons = document.querySelectorAll('.btn-secondary.leave-feedback');
    leaveFeedbackButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const orderId = row.cells[0].textContent;
            leaveFeedback(orderId);
        });
    });
});

// Perform search
function performSearch(term) {
    // In a real application, this would filter the orders based on the search term
    console.log(`Searching for order: ${term}`);
    
    // Show search results message
    showAlert(`Showing results for "${term}"`, 'info');
}

// Filter orders by status
function filterByStatus(status) {
    console.log(`Filtering by status: ${status}`);
    // In a real application, this would filter the orders by status
    
    if (status === 'All Statuses') {
        showAlert('Showing all orders', 'info');
    } else {
        showAlert(`Showing orders with status: ${status}`, 'info');
    }
}

// Update order status
function updateOrderStatus(row, orderId) {
    // In a real application, this would send an update request to the server
    console.log(`Updating status for order: ${orderId}`);
    
    // Show loading state
    const originalText = row.cells[6].innerHTML;
    row.cells[6].innerHTML = '<span>Updating...</span>';
    
    // Simulate API call delay
    setTimeout(() => {
        // Update the status visually (in a real app, this would come from the server)
        const statusCell = row.cells[5];
        statusCell.innerHTML = '<span class="status-badge status-shipped">Shipped</span>';
        
        // Show success message
        showAlert(`Order ${orderId} status updated successfully!`, 'success');
    }, 1000);
}

// View order details
function viewOrderDetails(orderId) {
    // In a real application, this would open a modal or navigate to order details page
    console.log(`Viewing details for order: ${orderId}`);
    
    // Show alert for demonstration
    showAlert(`Viewing details for order ${orderId}`, 'info');
}

// Delete an order
function deleteOrder(row, orderId) {
    // In a real application, this would send a delete request to the server
    console.log(`Deleting order: ${orderId}`);
    
    // Show confirmation
    if (confirm(`Are you sure you want to delete order ${orderId}? This action cannot be undone.`)) {
        // Show loading state
        const originalText = row.cells[6].innerHTML;
        row.cells[6].innerHTML = '<span>Deleting...</span>';
        
        // Simulate API call delay
        setTimeout(() => {
            // Remove the row from the table
            row.remove();
            
            // Show success message
            showAlert(`Order ${orderId} deleted successfully!`, 'success');
        }, 1000);
    }
}

// Leave feedback for an order
function leaveFeedback(orderId) {
    // In a real application, this would open a feedback modal or navigate to feedback page
    console.log(`Leaving feedback for order: ${orderId}`);
    
    // Show feedback modal or form
    showAlert(`Feedback form for order ${orderId} would be displayed here.`, 'info');
    
    // For demonstration, we'll just log that the function was called
    console.log(`Opening feedback interface for order ${orderId}`);
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
    
    // Insert at the top of the main content
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.insertBefore(alertDiv, mainContent.firstChild);
    }
    
    // Remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}