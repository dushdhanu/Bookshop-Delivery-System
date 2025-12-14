// Customer Orders - Real Logic

document.addEventListener('DOMContentLoaded', () => {
    // Place Order Button
    const placeBtn = document.getElementById('placeOrderBtn');
    if(placeBtn) placeBtn.addEventListener('click', placeOrder);

    // If on orders page, load them
    if(document.querySelector('.order-list') || document.querySelector('.order-card-vertical')) {
        loadMyOrders();
    }
});

async function placeOrder() {
    const cart = JSON.parse(localStorage.getItem('bookshopCart')) || [];
    if(cart.length === 0) {
        alert("Cart is empty!");
        return;
    }

    const orderRequest = {
        shippingAddress: document.getElementById('address').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        zipCode: document.getElementById('zipCode').value,
        phone: document.getElementById('phone').value,
        items: cart.map(i => ({ bookId: i.bookId, quantity: i.quantity }))
    };

    const token = localStorage.getItem('accessToken');

    try {
        const response = await fetch('http://localhost:8080/api/orders/place', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(orderRequest)
        });

        if(response.ok) {
            alert("Order placed successfully!");
            localStorage.removeItem('bookshopCart');
            window.location.href = "orders.html";
        } else {
            alert("Failed to place order.");
        }
    } catch(e) { console.error(e); alert("Network Error"); }
}

async function loadMyOrders() {
    const token = localStorage.getItem('accessToken');
    const response = await fetch('http://localhost:8080/api/orders', {
        headers: { 'Authorization': `Bearer ${token}` }
    });

    if(response.ok) {
        const orders = await response.json();
        // Render orders logic here (create HTML elements loop)
        // This replaces the static HTML in orders.html
    }
}

async function deleteOrder(orderId) {
    if(!confirm("Are you sure?")) return;

    const token = localStorage.getItem('accessToken');
    const response = await fetch(`http://localhost:8080/api/orders/${orderId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });

    if(response.ok) {
        alert("Order deleted.");
        location.reload();
    } else {
        alert("Could not delete order.");
    }
    async function leaveFeedback(message, rating) {
        const token = localStorage.getItem('accessToken');
        const response = await fetch('http://localhost:8080/api/feedback', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: message, rating: rating })
        });

        if(response.ok) alert("Thank you for your feedback!");
    }
}