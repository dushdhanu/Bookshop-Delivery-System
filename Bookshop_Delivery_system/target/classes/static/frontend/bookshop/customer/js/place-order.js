document.addEventListener('DOMContentLoaded', () => {
    // 1. Check if user is logged in (using api.js helper)
    if (typeof checkAuth === 'function') {
        if (!checkAuth()) return;
    }

    // 2. Load Items from LocalStorage
    loadCart();

    // 3. Bind Button Click
    const btn = document.getElementById('placeOrderBtn');
    if (btn) btn.addEventListener('click', handlePlaceOrder);
});

function loadCart() {
    const container = document.getElementById('orderItemsContainer');
    const totalEl = document.getElementById('grandTotal');
    const cart = JSON.parse(localStorage.getItem('bookshopCart')) || [];

    container.innerHTML = '';

    if (cart.length === 0) {
        container.innerHTML = '<p style="color:#666;">Your cart is empty.</p>';
        totalEl.textContent = '$0.00';
        // Disable button if empty
        document.getElementById('placeOrderBtn').disabled = true;
        document.getElementById('placeOrderBtn').style.opacity = 0.5;
        return;
    }

    let grandTotal = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        grandTotal += itemTotal;

        const row = document.createElement('div');
        row.style.display = 'flex';
        row.style.justifyContent = 'space-between';
        row.style.marginBottom = '10px';
        row.style.borderBottom = '1px solid #eee';
        row.style.paddingBottom = '5px';

        row.innerHTML = `
            <div>
                <div style="font-weight:bold; color:#333;">${item.title}</div>
                <div style="font-size:0.9rem; color:#666;">$${item.price} x ${item.quantity}</div>
            </div>
            <div style="font-weight:bold; color:#333;">$${itemTotal.toFixed(2)}</div>
        `;
        container.appendChild(row);
    });

    totalEl.textContent = `$${grandTotal.toFixed(2)}`;
}

async function handlePlaceOrder() {
    // 1. Get Form Data
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const zipCode = document.getElementById('zipCode').value;

    if (!address || !city || !state || !zipCode) {
        alert("Please fill in all address fields.");
        return;
    }

    // 2. Prepare Payload
    const cart = JSON.parse(localStorage.getItem('bookshopCart')) || [];
    const itemsPayload = cart.map(item => ({
        bookId: item.bookId,
        quantity: item.quantity
    }));

    const orderRequest = {
        shippingAddress: address,
        city: city,
        state: state,
        zipCode: zipCode,
        items: itemsPayload
    };

    // 3. Send to Backend
    const btn = document.getElementById('placeOrderBtn');
    btn.textContent = 'Processing...';
    btn.disabled = true;

    try {
        // Uses authenticatedFetch from api.js
        const response = await authenticatedFetch('/api/orders/place', {
            method: 'POST',
            body: JSON.stringify(orderRequest)
        });

        if (response.ok) {
            alert("Order placed successfully!");
            // Clear Cart
            localStorage.removeItem('bookshopCart');
            // Redirect to My Orders
            window.location.href = 'orders.html';
        } else {
            const errorText = await response.text();
            alert("Failed to place order: " + errorText);
            btn.disabled = false;
            btn.textContent = 'Confirm Order';
        }
    } catch (error) {
        console.error(error);
        alert("An error occurred while placing the order.");
        btn.disabled = false;
        btn.textContent = 'Confirm Order';
    }
}