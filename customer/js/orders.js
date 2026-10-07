// Customer Orders Page JavaScript

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
    
    // Reorder functionality
    const reorderButtons = document.querySelectorAll('.btn-link');
    
    reorderButtons.forEach(button => {
        button.addEventListener('click', function() {
            const orderItem = this.closest('.order-item');
            const orderNumber = orderItem.querySelector('h3').textContent;
            
            // Reorder items
            reorderItems(orderNumber);
        });
    });
    
    // Place order functionality
    const placeOrderBtn = document.getElementById('placeOrderBtn');
    const mobilePlaceOrderBtn = document.getElementById('mobilePlaceOrderBtn');
    
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', function() {
            placeOrder();
        });
    }
    
    if (mobilePlaceOrderBtn) {
        mobilePlaceOrderBtn.addEventListener('click', function() {
            placeOrder();
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

// View order details
function viewOrderDetails(orderNumber) {
    // In a real application, this would open a modal or navigate to order details page
    console.log(`Viewing details for ${orderNumber}`);
    
    // Show alert for demonstration
    showAlert(`Viewing details for ${orderNumber}`, 'info');
}

// Reorder items from a previous order
function reorderItems(orderNumber) {
    // In a real application, this would add all items from the order to the cart
    console.log(`Reordering items from ${orderNumber}`);
    
    // Show success message
    showAlert(`Items from ${orderNumber} have been added to your cart!`, 'success');
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

// View customer location on map
function viewCustomerLocationOnMap(address) {
    // In a real application, this would open a map view with the customer's location
    console.log(`Viewing map for address: ${address}`);
    
    // Show map view or alert with address information
    showAlert(`Map view for address: ${address} would be displayed here.`, 'info');
    
    // For demonstration, we'll just log that the function was called
    console.log(`Opening map view for address: ${address}`);
}

// Track order shipment
function trackOrder(orderNumber) {
    // In a real application, this would open a tracking page or modal
    console.log(`Tracking order ${orderNumber}`);
    
    // Show tracking information
    showAlert(`Tracking information for ${orderNumber} would be displayed here.`, 'info');
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
}

// Sort orders
function sortOrders(sortBy) {
    console.log(`Sorting orders by: ${sortBy}`);
    // In a real application, this would sort the orders
}

// Place order function
function placeOrder() {
    // In a real application, this would validate the form and submit the order
    console.log('Placing order');
    
    // Show loading state
    const placeOrderBtn = document.getElementById('placeOrderBtn');
    const mobilePlaceOrderBtn = document.getElementById('mobilePlaceOrderBtn');
    
    const originalText = placeOrderBtn ? placeOrderBtn.textContent : 'Place Order';
    
    if (placeOrderBtn) {
        placeOrderBtn.textContent = 'Processing...';
        placeOrderBtn.disabled = true;
    }
    
    if (mobilePlaceOrderBtn) {
        mobilePlaceOrderBtn.textContent = 'Processing...';
        mobilePlaceOrderBtn.disabled = true;
    }
    
    // Simulate API call delay
    setTimeout(() => {
        // Reset buttons
        if (placeOrderBtn) {
            placeOrderBtn.textContent = originalText;
            placeOrderBtn.disabled = false;
        }
        
        if (mobilePlaceOrderBtn) {
            mobilePlaceOrderBtn.textContent = originalText;
            mobilePlaceOrderBtn.disabled = false;
        }
        
        // Show success message
        showAlert('Order placed successfully! Thank you for your purchase.', 'success');
        
        // In a real app, you would redirect to an order confirmation page
        // window.location.href = 'order-confirmation.html';
    }, 2000);
}

// Helper function to find elements containing specific text
function containsText(selector, text) {
    const elements = document.querySelectorAll(selector);
    return Array.from(elements).find(element => 
        element.textContent.includes(text)
    );
}