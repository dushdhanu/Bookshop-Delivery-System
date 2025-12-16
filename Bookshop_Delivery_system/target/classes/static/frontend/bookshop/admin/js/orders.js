// URL for the Orders API
const API_URL = '/api/orders';

document.addEventListener('DOMContentLoaded', () => {
    loadOrders();
});

// Fetch and display orders
async function loadOrders() {
    try {
        const token = localStorage.getItem('token'); // Assuming you use JWT
        const response = await fetch(API_URL, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) throw new Error('Failed to fetch orders');

        const orders = await response.json();
        const ordersTableBody = document.querySelector('#ordersTableBody'); // Ensure your HTML table body has this ID
        ordersTableBody.innerHTML = '';

        orders.forEach(order => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${order.id}</td>
                <td>${order.user ? order.user.username : 'Guest'}</td>
                <td>${new Date(order.orderDate).toLocaleDateString()}</td>
                <td>${order.totalAmount}</td>
                <td><span class="badge ${getStatusBadge(order.status)}">${order.status}</span></td>
                <td>
                    <button class="btn btn-sm btn-info" onclick="viewOrder(${order.id})">View</button>
                    <button class="btn btn-sm btn-danger delete-btn" data-id="${order.id}">Delete</button>
                </td>
            `;
            ordersTableBody.appendChild(row);
        });

        // Attach event listeners to new delete buttons
        attachDeleteListeners();

    } catch (error) {
        console.error('Error:', error);
        alert('Could not load orders');
    }
}

// --- FIX: Function to handle delete ---
function attachDeleteListeners() {
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', async (e) => {
            const orderId = e.target.getAttribute('data-id');

            if (confirm(`Are you sure you want to delete Order #${orderId}?`)) {
                await deleteOrder(orderId);
            }
        });
    });
}

async function deleteOrder(id) {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            alert('Order deleted successfully');
            loadOrders(); // Refresh table
        } else {
            const errorText = await response.text();
            alert(`Failed to delete: ${errorText}`);
        }
    } catch (error) {
        console.error('Error deleting order:', error);
        alert('An error occurred while deleting the order');
    }
}

function getStatusBadge(status) {
    switch (status.toLowerCase()) {
        case 'pending': return 'bg-warning';
        case 'shipped': return 'bg-primary';
        case 'delivered': return 'bg-success';
        case 'cancelled': return 'bg-danger';
        default: return 'bg-secondary';
    }
}

// Function to view order details (Placeholder)
function viewOrder(id) {
    // You can implement redirection to a details page or open a modal
    window.location.href = `order-details.html?id=${id}`;
}