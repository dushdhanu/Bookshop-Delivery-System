document.addEventListener('DOMContentLoaded', () => {
    loadOrders();

    // Handle Feedback Form Submit
    document.getElementById('feedback-form').addEventListener('submit', submitFeedback);
});

async function loadOrders() {
    const container = document.getElementById('orders-container');
    container.innerHTML = '<p>Loading orders...</p>';

    try {
        // Fetch orders from backend
        const response = await fetch('/api/orders/my-orders', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming you use JWT
            }
        });

        if (!response.ok) throw new Error('Failed to fetch orders');

        const orders = await response.json();
        container.innerHTML = '';

        if (orders.length === 0) {
            container.innerHTML = '<p>No orders found.</p>';
            return;
        }

        orders.forEach(order => {
            const card = createOrderCard(order);
            container.appendChild(card);
        });

    } catch (error) {
        console.error('Error:', error);
        container.innerHTML = '<p class="error">Error loading orders. Please try again.</p>';
    }
}

function createOrderCard(order) {
    const div = document.createElement('div');
    div.className = 'order-card';
    div.style.border = '1px solid #ddd';
    div.style.padding = '15px';
    div.style.marginBottom = '15px';
    div.style.borderRadius = '5px';
    div.style.backgroundColor = '#fff';

    // FEATURE 3: VIEW MAP logic
    // We construct a Google Maps URL using the delivery address
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(order.deliveryAddress)}`;

    div.innerHTML = `
        <div class="order-header">
            <h3>Order #${order.id}</h3>
            <span class="status ${order.status.toLowerCase()}">${order.status}</span>
        </div>
        <div class="order-details">
            <p><strong>Date:</strong> ${new Date(order.orderDate).toLocaleDateString()}</p>
            <p><strong>Total:</strong> LKR ${order.totalAmount}</p>
            <p><strong>Address:</strong> ${order.deliveryAddress}</p>
        </div>
        <div class="order-actions" style="margin-top: 15px; display: flex; gap: 10px;">
            <a href="${mapUrl}" target="_blank" class="btn btn-secondary" style="padding: 8px 15px; background: #3498db; color: white; text-decoration: none; border-radius: 4px;">
                <i class="fas fa-map-marker-alt"></i> View Map
            </a>

            ${order.status === 'DELIVERED' ?
        `<button onclick="openFeedbackModal(${order.id})" class="btn btn-info" style="padding: 8px 15px; background: #f1c40f; border: none; border-radius: 4px; cursor: pointer;">
                    <i class="fas fa-star"></i> Feedback
                 </button>` : ''
    }

            ${order.status === 'PENDING' ?
        `<button onclick="deleteOrder(${order.id})" class="btn btn-danger" style="padding: 8px 15px; background: #e74c3c; color: white; border: none; border-radius: 4px; cursor: pointer;">
                    <i class="fas fa-trash"></i> Cancel Order
                 </button>` : ''
    }
        </div>
    `;
    return div;
}

// FEATURE 1: DELETE ORDER FUNCTION
async function deleteOrder(orderId) {
    if (!confirm('Are you sure you want to cancel this order?')) return;

    try {
        const response = await fetch(`/api/orders/${orderId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.ok) {
            alert('Order cancelled successfully');
            loadOrders(); // Refresh the list
        } else {
            const msg = await response.text();
            alert('Failed to cancel order: ' + msg);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong');
    }
}

// FEATURE 2: FEEDBACK FUNCTIONS
function openFeedbackModal(orderId) {
    document.getElementById('feedback-order-id').value = orderId;
    document.getElementById('feedback-modal').style.display = 'block';
}

function closeFeedbackModal() {
    document.getElementById('feedback-modal').style.display = 'none';
}

async function submitFeedback(e) {
    e.preventDefault();

    const orderId = document.getElementById('feedback-order-id').value;
    const rating = document.getElementById('feedback-rating').value;
    const comment = document.getElementById('feedback-comment').value;

    try {
        const response = await fetch('/api/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                orderId: orderId, // Ensure your DTO handles this if you want to link it
                rating: parseInt(rating),
                comment: comment
            })
        });

        if (response.ok) {
            alert('Thank you for your feedback!');
            closeFeedbackModal();
            document.getElementById('feedback-form').reset();
        } else {
            alert('Failed to submit feedback');
        }
    } catch (error) {
        console.error(error);
        alert('Error submitting feedback');
    }
}

// Close modal if user clicks outside of it
window.onclick = function(event) {
    const modal = document.getElementById('feedback-modal');
    if (event.target == modal) {
        closeFeedbackModal();
    }
}