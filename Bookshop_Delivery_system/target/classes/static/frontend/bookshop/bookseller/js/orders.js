// Orders Page JavaScript for Bookseller

document.addEventListener('DOMContentLoaded', function() {
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
    
    // Mark as shipped functionality
    const shipButtons = document.querySelectorAll('.btn-primary');
    
    shipButtons.forEach(button => {
        button.addEventListener('click', function() {
            const orderItem = this.closest('.order-item');
            const orderNumber = orderItem.querySelector('h3').textContent;
            
            // Mark order as shipped
            markAsShipped(orderNumber, orderItem);
        });
    });
    
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
    
    // Search functionality would go here if needed
});

// View order details
function viewOrderDetails(orderNumber) {
    // In a real application, this would open a modal or navigate to order details page
    console.log(`Viewing details for ${orderNumber}`);
    
    // Show alert for demonstration
    showAlert(`Viewing details for ${orderNumber}`, 'info');
}

// Mark order as shipped
function markAsShipped(orderNumber, orderElement) {
    if (confirm(`Mark order ${orderNumber} as shipped?`)) {
        // In a real application, this would send a request to update the order status
        console.log(`Marking order ${orderNumber} as shipped`);
        
        // Show loading state
        const shipButton = orderElement.querySelector('.btn-primary');
        const originalText = shipButton.textContent;
        shipButton.textContent = 'Processing...';
        shipButton.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            // Update order status visually
            const orderStatus = orderElement.querySelector('.order-status');
            if (orderStatus) {
                orderStatus.className = 'order-status status-shipped';
                orderStatus.innerHTML = '<span>Shipped</span>';
            }
            
            // Remove the "Mark as Shipped" button
            shipButton.remove();
            
            // Show success message
            showAlert(`Order ${orderNumber} marked as shipped successfully!`, 'success');
        }, 1000);
    }
}

// Cancel an order
function cancelOrder(orderNumber) {
    // In a real application, this would send a request to cancel the order
    console.log(`Cancelling order ${orderNumber}`);
    
    // Show confirmation
    if (confirm(`Are you sure you want to cancel order ${orderNumber}?`)) {
        // Update order status visually
        const orderStatus = document.querySelector(`[data-order="${orderNumber}"] .order-status`);
        if (orderStatus) {
            orderStatus.className = 'order-status status-cancelled';
            orderStatus.innerHTML = '<span>Cancelled</span>';
        }
        
        showAlert(`Order ${orderNumber} has been cancelled.`, 'success');
    }
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

// Show alert messages
function showAlert(message, type = 'success') {
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type === 'info' ? 'warning' : type}`;
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

// Filter orders by status
function filterOrders(status) {
    console.log(`Filtering orders by status: ${status}`);
    // In a real application, this would filter the displayed orders
    
    // Update active filter
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    event.target.classList.add('active');
    
    // Show alert for demo purposes
    showAlert(`Filtered orders by status: ${status}`, 'info');
}

// Sort orders
function sortOrders(sortBy) {
    console.log(`Sorting orders by: ${sortBy}`);
    // In a real application, this would sort the orders
    
    // Show alert for demo purposes
    showAlert(`Sorted orders by: ${sortBy}`, 'info');
}

// Helper function to find elements containing specific text
function containsText(selector, text) {
    const elements = document.querySelectorAll(selector);
    return Array.from(elements).find(element => 
        element.textContent.includes(text)
    );
}