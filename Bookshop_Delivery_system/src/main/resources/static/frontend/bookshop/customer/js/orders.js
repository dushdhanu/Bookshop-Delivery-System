document.addEventListener("DOMContentLoaded", function () {
    loadUserOrders();
});

function loadUserOrders() {
    // 1. Fetch orders from the backend
    fetch('/api/orders/my-orders', {
        headers: {
            // Assumes you store the login token in localStorage
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
        .then(response => response.json())
        .then(orders => {
            const container = document.getElementById('orders-container'); // Make sure your HTML has a div with id="orders-container"
            container.innerHTML = '';

            if (!orders || orders.length === 0) {
                container.innerHTML = '<p style="color:white;">You have no orders yet.</p>';
                return;
            }

            // 2. Generate HTML for each order
            orders.forEach(order => {
                // Create list of books for display
                let booksHtml = '';
                order.items.forEach(item => {
                    booksHtml += `
                    <div class="book-item">
                        <p><strong>${item.book.title}</strong> (x${item.quantity}) - $${item.priceAtPurchase}</p>
                    </div>`;
                });

                // Create the card
                const orderCard = `
                <div class="order-card" style="border: 1px solid #333; background: #1a1a1a; color: white; padding: 20px; margin-bottom: 20px; border-radius: 8px;">
                    <div class="order-header" style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                        <div>
                            <h3>Order #${order.id}</h3>
                            <p>Date: ${new Date(order.orderDate).toLocaleDateString()}</p>
                        </div>
                        <div style="text-align: right;">
                            <h3>$${order.totalAmount}</h3>
                            <span class="status-badge ${order.status.toLowerCase()}">${order.status}</span>
                        </div>
                    </div>
                    
                    <div class="order-items" style="margin-bottom: 20px; border-top: 1px solid #444; padding-top: 10px;">
                        ${booksHtml}
                    </div>

                    <div class="actions">
                        <button onclick="leaveFeedback(${order.id})" class="btn-feedback" style="background: #444; color: white; border: none; padding: 8px 15px; border-radius: 4px; cursor: pointer; margin-right: 10px;">Leave Feedback</button>
                        <button onclick="deleteOrder(${order.id})" class="btn-delete" style="background: #dc3545; color: white; border: none; padding: 8px 15px; border-radius: 4px; cursor: pointer;">Delete Order</button>
                    </div>
                </div>
            `;
                container.innerHTML += orderCard;
            });
        })
        .catch(error => console.error('Error loading orders:', error));
}

// --- FUNCTION FOR DELETE BUTTON ---
function deleteOrder(orderId) {
    if (!confirm("Are you sure you want to delete this order?")) return;

    fetch(`/api/orders/${orderId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
        .then(response => {
            if (response.ok) {
                alert("Order deleted successfully");
                loadUserOrders(); // Reload the list
            } else {
                alert("Failed to delete order");
            }
        })
        .catch(error => console.error('Error:', error));
}

// --- FUNCTION FOR FEEDBACK BUTTON ---
function leaveFeedback(orderId) {
    // Navigate to feedback page with the Order ID in the URL
    window.location.href = `feedback.html?orderId=${orderId}`;
}