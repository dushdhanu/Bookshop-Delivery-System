// Orders JavaScript for Delivery Personnel

document.addEventListener('DOMContentLoaded', function() {
    // Mark order as delivered functionality
    const deliveredButtons = document.querySelectorAll('.btn-primary');
    
    deliveredButtons.forEach(button => {
        button.addEventListener('click', function() {
            const orderItem = this.closest('.order-item');
            const orderNumber = orderItem.querySelector('h3').textContent;
            
            // Mark order as delivered
            markOrderAsDelivered(orderNumber, orderItem);
        });
    });
    
    // View order details functionality
    const viewDetailsButtons = document.querySelectorAll('.btn-secondary');
    
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const orderItem = this.closest('.order-item');
            const orderNumber = orderItem.querySelector('h3').textContent;
            
            // View order details
            viewOrderDetails(orderNumber);
        });
    });
    
    // Handle search functionality
    const searchButton = document.querySelector('.search-bar .btn');
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            const searchTerm = document.querySelector('.search-bar .form-input').value;
            searchOrders(searchTerm);
        });
    }
    
    // Handle filter selection
    const filterSelect = document.querySelector('.filter-options select');
    if (filterSelect) {
        filterSelect.addEventListener('change', function() {
            const status = this.value;
            filterOrdersByStatus(status);
        });
    }
    
    // Delete order functionality
    const deleteOrderButtons = document.querySelectorAll('.btn-danger');
    
    deleteOrderButtons.forEach(button => {
        button.addEventListener('click', function() {
            const orderCard = this.closest('.order-card-vertical');
            const orderNumber = orderCard.querySelector('.order-id').textContent;
            
            // Delete order
            deleteOrder(orderNumber);
        });
    });
    
    // Leave feedback functionality
    const leaveFeedbackButtons = document.querySelectorAll('.btn-secondary:not(.view-details)');
    
    leaveFeedbackButtons.forEach(button => {
        if (button.textContent.includes('Leave Feedback') || button.textContent.includes('Feedback')) {
            button.addEventListener('click', function() {
                const orderCard = this.closest('.order-card-vertical');
                const orderNumber = orderCard.querySelector('.order-id').textContent;
                
                // Leave feedback
                leaveFeedback(orderNumber);
            });
        }
    });
});

// Mark order as delivered
function markOrderAsDelivered(orderNumber, orderElement) {
    // In a real application, this would send a request to update the order status
    console.log(`Marking order ${orderNumber} as delivered`);
    
    // Show confirmation
    if (confirm(`Mark order ${orderNumber} as delivered?`)) {
        // Show loading state
        const button = orderElement.querySelector('.btn-primary');
        const originalText = button.textContent;
        button.textContent = 'Processing...';
        button.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            // Update order status visually
            const orderStatus = orderElement.querySelector('.order-status');
            if (orderStatus) {
                orderStatus.className = 'order-status status-delivered';
                orderStatus.innerHTML = '<span>Delivered</span>';
            }
            
            // Remove the "Mark as Delivered" button
            button.remove();
            
            // Show success message
            showAlert(`Order ${orderNumber} marked as delivered successfully!`, 'success');
        }, 1000);
    }
}

// View order details
function viewOrderDetails(orderNumber) {
    // In a real application, this would open a modal or navigate to order details page
    console.log(`Viewing details for ${orderNumber}`);
    
    // Show alert for demonstration
    showAlert(`Viewing details for ${orderNumber}`, 'info');
}

// Delete an order
function deleteOrder(orderNumber) {
    // In a real application, this would send a request to delete the order
    console.log(`Deleting order ${orderNumber}`);
    
    // Show confirmation
    if (confirm(`Are you sure you want to delete order ${orderNumber}? This action cannot be undone.`)) {
        // Remove the order card from the DOM
        const orderCard = document.querySelector(`.order-card-vertical .order-id:contains('${orderNumber}')`)?.closest('.order-card-vertical');
        if (orderCard) {
            orderCard.remove();
            showAlert(`Order ${orderNumber} has been deleted.`, 'success');
        } else {
            // Alternative method to find the order card
            const orderCards = document.querySelectorAll('.order-card-vertical');
            orderCards.forEach(card => {
                const orderIdElement = card.querySelector('.order-id');
                if (orderIdElement && orderIdElement.textContent === orderNumber) {
                    card.remove();
                    showAlert(`Order ${orderNumber} has been deleted.`, 'success');
                }
            });
        }
    }
}

// Leave feedback for an order
function leaveFeedback(orderNumber) {
    // In a real application, this would open a feedback modal or navigate to feedback page
    console.log(`Leaving feedback for order ${orderNumber}`);
    
    // Show feedback modal or form
    showAlert(`Feedback form for ${orderNumber} would be displayed here.`, 'info');
    
    // For demonstration, we'll just log that the function was called
    console.log(`Opening feedback interface for order ${orderNumber}`);
}

// View customer location on map
function viewCustomerLocationOnMap(address) {
    // In a real application, this would open a map view with the customer's location
    console.log(`Viewing map for address: ${address}`);
    
    // Encode the address for URL
    const encodedAddress = encodeURIComponent(address);
    
    // Create a Google Maps URL (in a real app, you might use a mapping API)
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    
    // Show confirmation dialog before opening map
    if (confirm(`Open map for address: ${address}? This will open Google Maps in a new tab.`)) {
        // Open the map in a new tab
        window.open(mapsUrl, '_blank');
        
        // Show success message
        showAlert(`Opening map for address: ${address}`, 'success');
    }
    
    // For demonstration, we'll also log that the function was called
    console.log(`Opening map view for address: ${address}`);
}

// Search orders
function searchOrders(searchTerm) {
    // In a real application, this would filter the displayed orders
    console.log(`Searching orders for: ${searchTerm}`);
    
    if (!searchTerm.trim()) {
        showAlert('Please enter a search term', 'warning');
        return;
    }
    
    showAlert(`Searching for orders containing: ${searchTerm}`, 'info');
}

// Filter orders by status
function filterOrdersByStatus(status) {
    // In a real application, this would filter the displayed orders
    console.log(`Filtering orders by status: ${status}`);
    
    if (status === 'All Statuses') {
        showAlert('Showing all orders', 'info');
    } else {
        showAlert(`Showing orders with status: ${status}`, 'info');
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
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    // Insert at the top of the container
    const container = document.querySelector('.container');
    if (container) {
        container.insertBefore(alertDiv, container.firstChild);
    }
    
    // Remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

// Helper function to find elements containing specific text
function containsText(selector, text) {
    const elements = document.querySelectorAll(selector);
    return Array.from(elements).find(element => 
        element.textContent.includes(text)
    );
}