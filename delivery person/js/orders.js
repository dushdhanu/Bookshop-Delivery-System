// Orders JavaScript for Delivery Personnel

const orderDatabase = {
    'ORD-2025-045': {
        id: '#ORD-2025-045',
        date: 'Dec 1, 2025',
        time: '02:15 PM',
        status: 'In Transit',
        statusCode: 'in-transit',
        customer: {
            name: 'John Smith',
            phone: '+94 77 123 4567',
            email: 'john.smith@gmail.com',
            address: '123 Main St, City',
            notes: 'Leave package at reception desk if unavailable.'
        },
        items: [
            { title: 'Clean Code: A Handbook of Agile Software Craftsmanship', author: 'Robert C. Martin', qty: 1, price: 15.99 },
            { title: 'JavaScript: The Good Parts', author: 'Douglas Crockford', qty: 1, price: 11.99 }
        ],
        subtotal: 27.98,
        deliveryFee: 0.00,
        total: 27.98,
        paymentMethod: 'Credit Card (Prepaid - Verified)',
        timeline: [
            { time: '10:15 AM', label: 'Order Placed by Customer', done: true },
            { time: '11:45 AM', label: 'Packed & Picked up from Central Hub', done: true },
            { time: '01:30 PM', label: 'Out for Delivery (In Transit)', done: true },
            { time: 'Pending', label: 'Delivered to Customer', done: false }
        ]
    },
    'ORD-2025-042': {
        id: '#ORD-2025-042',
        date: 'Nov 30, 2025',
        time: '04:20 PM',
        status: 'Pending',
        statusCode: 'pending',
        customer: {
            name: 'Sarah Johnson',
            phone: '+94 77 456 7890',
            email: 'sarah.j@example.com',
            address: '456 Oak Ave, Town',
            notes: 'Please call upon arrival. Ring gate bell.'
        },
        items: [
            { title: 'Atomic Habits: An Easy & Proven Way to Build Good Habits', author: 'James Clear', qty: 1, price: 14.99 }
        ],
        subtotal: 14.99,
        deliveryFee: 0.00,
        total: 14.99,
        paymentMethod: 'Cash on Delivery (COD) - Collect $14.99',
        timeline: [
            { time: 'Nov 30, 04:20 PM', label: 'Order Placed by Customer', done: true },
            { time: 'Dec 1, 08:30 AM', label: 'Package Prepared & Ready for Delivery', done: true },
            { time: 'Pending', label: 'Out for Delivery', done: false },
            { time: 'Pending', label: 'Delivered to Customer', done: false }
        ]
    },
    'ORD-2025-038': {
        id: '#ORD-2025-038',
        date: 'Nov 28, 2025',
        time: '09:30 AM',
        status: 'Delivered',
        statusCode: 'delivered',
        customer: {
            name: 'Michael Brown',
            phone: '+94 71 890 1234',
            email: 'michael.brown@outlook.com',
            address: '789 Pine Rd, Village',
            notes: 'Delivered to front door porch. Signed by M. Brown.'
        },
        items: [
            { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', qty: 1, price: 12.99 },
            { title: 'To Kill a Mockingbird', author: 'Harper Lee', qty: 1, price: 14.50 },
            { title: '1984', author: 'George Orwell', qty: 1, price: 11.98 }
        ],
        subtotal: 39.47,
        deliveryFee: 0.00,
        total: 39.47,
        paymentMethod: 'Credit Card (Prepaid - Verified)',
        timeline: [
            { time: 'Nov 28, 09:30 AM', label: 'Order Placed by Customer', done: true },
            { time: 'Nov 28, 11:15 AM', label: 'Dispatched from Central Hub', done: true },
            { time: 'Nov 28, 02:40 PM', label: 'Out for Delivery', done: true },
            { time: 'Nov 28, 04:15 PM', label: 'Delivered & Recipient Signature Received', done: true }
        ]
    },
    'ORD-7842': {
        id: '#ORD-7842',
        date: 'Dec 1, 2025',
        time: '11:00 AM',
        status: 'Pending',
        statusCode: 'pending',
        customer: {
            name: 'John Smith',
            phone: '+94 77 123 4567',
            email: 'john.smith@gmail.com',
            address: '123 Main St, Apt 4B, Cityville',
            notes: 'Leave at front door if no answer.'
        },
        items: [
            { title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', qty: 1, price: 21.99 },
            { title: 'The Hobbit', author: 'J.R.R. Tolkien', qty: 2, price: 20.98 }
        ],
        subtotal: 42.97,
        deliveryFee: 0.00,
        total: 42.97,
        paymentMethod: 'Credit Card (Paid)',
        timeline: [
            { time: '11:00 AM', label: 'Order Placed', done: true },
            { time: '12:30 PM', label: 'Ready for Dispatch', done: true }
        ]
    },
    'ORD-7521': {
        id: '#ORD-7521',
        date: 'Nov 30, 2025',
        time: '01:15 PM',
        status: 'Pending',
        statusCode: 'pending',
        customer: {
            name: 'Sarah Johnson',
            phone: '+94 77 456 7890',
            email: 'sarah.j@example.com',
            address: '456 Oak Ave, Springfield',
            notes: 'Call before delivery.'
        },
        items: [
            { title: 'Dune', author: 'Frank Herbert', qty: 1, price: 15.99 },
            { title: 'Foundation', author: 'Isaac Asimov', qty: 1, price: 11.99 }
        ],
        subtotal: 27.98,
        deliveryFee: 0.00,
        total: 27.98,
        paymentMethod: 'Debit Card (Paid)',
        timeline: [
            { time: '01:15 PM', label: 'Order Placed', done: true }
        ]
    },
    'ORD-7294': {
        id: '#ORD-7294',
        date: 'Nov 29, 2025',
        time: '10:00 AM',
        status: 'Pending',
        statusCode: 'pending',
        customer: {
            name: 'Michael Brown',
            phone: '+94 71 890 1234',
            email: 'michael.brown@outlook.com',
            address: '789 Pine Rd, Lakewood',
            notes: 'Ring doorbell.'
        },
        items: [
            { title: 'Sapiens: A Brief History of Humankind', author: 'Yuval Noah Harari', qty: 1, price: 19.99 }
        ],
        subtotal: 19.99,
        deliveryFee: 0.00,
        total: 19.99,
        paymentMethod: 'Cash on Delivery',
        timeline: [
            { time: '10:00 AM', label: 'Order Placed', done: true }
        ]
    }
};

// Helper: Normalize order ID and retrieve or infer data
function getOrderData(orderId, cardElement) {
    const rawId = String(orderId || '').trim();
    const cleanId = rawId.replace(/[^a-zA-Z0-9-]/g, '').toUpperCase();
    
    // Look up in database
    for (let key in orderDatabase) {
        if (key.toUpperCase() === cleanId || cleanId.includes(key.toUpperCase()) || key.toUpperCase().includes(cleanId)) {
            return JSON.parse(JSON.stringify(orderDatabase[key]));
        }
    }

    // Fallback: Infer from DOM card if available
    let customerName = 'Customer';
    let customerAddress = 'Delivery Address';
    let itemsText = '1 book';
    let totalText = '$0.00';

    if (cardElement) {
        const rows = cardElement.querySelectorAll('.detail-row-vertical');
        rows.forEach(r => {
            const label = r.querySelector('.detail-label-vertical')?.textContent.toLowerCase() || '';
            const val = r.querySelector('.detail-value-vertical')?.textContent.trim() || '';
            if (label.includes('customer')) customerName = val;
            if (label.includes('address')) customerAddress = val;
            if (label.includes('items')) itemsText = val;
            if (label.includes('total')) totalText = val;
        });
    }

    const totalNum = parseFloat(totalText.replace(/[^0-9.]/g, '')) || 25.00;

    return {
        id: rawId.startsWith('#') ? rawId : '#' + rawId,
        date: 'Recent',
        time: '12:00 PM',
        status: 'In Transit',
        statusCode: 'in-transit',
        customer: {
            name: customerName,
            phone: '+94 77 000 0000',
            email: customerName.toLowerCase().replace(/\s+/g, '.') + '@example.com',
            address: customerAddress,
            notes: 'Please contact upon arrival.'
        },
        items: [
            { title: 'Selected Book Order (' + itemsText + ')', author: 'Various Authors', qty: 1, price: totalNum }
        ],
        subtotal: totalNum,
        deliveryFee: 0.00,
        total: totalNum,
        paymentMethod: 'Prepaid Online Order',
        timeline: [
            { time: 'Morning', label: 'Order Placed', done: true },
            { time: 'Current', label: 'Out for Delivery', done: true }
        ]
    };
}

// 1. Contact Customer Feature
function contactCustomer(orderId) {
    const card = document.querySelector(`.order-card-vertical .order-id-vertical:contains('${orderId}')`)?.closest('.order-card-vertical')
        || Array.from(document.querySelectorAll('.order-card-vertical, .delivery-item')).find(el => el.textContent.includes(orderId));
    
    const order = getOrderData(orderId, card);
    const initials = order.customer.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'CU';

    Swal.fire({
        title: `<div style="display:flex; align-items:center; justify-content:center; gap:8px;">
                    <span style="font-size:1.4rem;">📞</span>
                    <span>Contact Customer</span>
                </div>`,
        html: `
            <div style="text-align: left; font-size: 0.95rem; color: #ffffff;">
                <div style="background: #10235d; border: 1px solid #1e3a8a; border-radius: 8px; padding: 14px; margin-bottom: 14px;">
                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                        <div style="width: 44px; height: 44px; border-radius: 50%; background: #3b82f6; display: flex; align-items: center; justify-content: center; font-size: 1.15rem; font-weight: bold; color: #fff;">
                            ${initials}
                        </div>
                        <div>
                            <div style="font-weight: 700; font-size: 1.1rem; color: #ffffff;">${order.customer.name}</div>
                            <div style="color: #a0c0ff; font-size: 0.85rem;">Order: <span style="font-weight:600; color:#fff;">${order.id}</span></div>
                        </div>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 7px; font-size: 0.9rem;">
                        <div><strong style="color: #94a3b8;">📞 Phone:</strong> <a href="tel:${order.customer.phone}" style="color: #60a5fa; text-decoration: underline; font-weight: 600; margin-left: 4px;">${order.customer.phone}</a></div>
                        <div><strong style="color: #94a3b8;">✉️ Email:</strong> <a href="mailto:${order.customer.email}" style="color: #60a5fa; text-decoration: underline; margin-left: 4px;">${order.customer.email}</a></div>
                        <div><strong style="color: #94a3b8;">📍 Address:</strong> <span style="color: #ffffff; margin-left: 4px;">${order.customer.address}</span></div>
                        <div><strong style="color: #94a3b8;">📝 Note:</strong> <span style="color: #f59e0b; margin-left: 4px;">"${order.customer.notes || 'Please contact on arrival.'}"</span></div>
                    </div>
                </div>

                <!-- Direct Action Links -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 14px;">
                    <a href="tel:${order.customer.phone}" style="display: flex; align-items: center; justify-content: center; gap: 6px; background: #2563eb; color: #ffffff; padding: 10px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 0.9rem; text-align: center;">
                        📞 Call Customer
                    </a>
                    <a href="https://wa.me/${order.customer.phone.replace(/[^0-9]/g, '')}" target="_blank" style="display: flex; align-items: center; justify-content: center; gap: 6px; background: #16a34a; color: #ffffff; padding: 10px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 0.9rem; text-align: center;">
                        💬 WhatsApp
                    </a>
                </div>

                <!-- In-app / SMS Quick Message Composer -->
                <div>
                    <label style="display: block; font-weight: 600; margin-bottom: 6px; color: #a0c0ff; font-size: 0.88rem;">Send Quick In-App / SMS Update:</label>
                    <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 8px;">
                        <button type="button" class="preset-pill" onclick="document.getElementById('quickCustMsg').value='Hello ${order.customer.name.split(' ')[0]}, I am on my way with your BookShop order and will arrive in approx 10 minutes!'">🚗 Arriving in 10m</button>
                        <button type="button" class="preset-pill" onclick="document.getElementById('quickCustMsg').value='Hello ${order.customer.name.split(' ')[0]}, I have arrived at your delivery address. Please come to the entrance.'">📍 Arrived at Address</button>
                        <button type="button" class="preset-pill" onclick="document.getElementById('quickCustMsg').value='Hello ${order.customer.name.split(' ')[0]}, please confirm your gate or apartment number.'">🚪 Confirm Gate/Apt</button>
                    </div>
                    <textarea id="quickCustMsg" rows="3" placeholder="Type message to ${order.customer.name}..." style="width: 100%; box-sizing: border-box; background: #0a1128; border: 1px solid #1e3a8a; border-radius: 6px; padding: 8px 10px; color: #ffffff; font-size: 0.9rem; resize: none;"></textarea>
                </div>
            </div>
        `,
        width: '540px',
        showCancelButton: true,
        confirmButtonText: 'Send Message',
        cancelButtonText: 'Close',
        confirmButtonColor: '#3b82f6',
        cancelButtonColor: '#475569',
        preConfirm: () => {
            const msg = document.getElementById('quickCustMsg')?.value?.trim();
            return { msg: msg };
        }
    }).then((res) => {
        if (res.isConfirmed && res.value && res.value.msg) {
            Swal.fire({
                title: 'Message Sent!',
                text: `Your message has been dispatched to ${order.customer.name} via SMS.`,
                icon: 'success',
                confirmButtonColor: '#3b82f6',
                background: '#1a1a2e',
                color: '#ffffff'
            });
        }
    });
}

// 2. View Order Details Feature
function viewOrderDetails(orderId) {
    const card = Array.from(document.querySelectorAll('.order-card-vertical, .delivery-item')).find(el => el.textContent.includes(orderId));
    const order = getOrderData(orderId, card);
    
    // Status color
    let statusBg = '#3b82f6';
    if (order.statusCode === 'in-transit') statusBg = '#8b5cf6';
    if (order.statusCode === 'delivered') statusBg = '#10b981';
    
    // Items list HTML
    const itemsHtml = order.items.map(item => `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #1e3a8a;">
            <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 1.2rem;">📖</span>
                <div>
                    <div style="font-weight: 600; color: #ffffff; font-size: 0.92rem;">${item.title}</div>
                    <div style="color: #94a3b8; font-size: 0.8rem;">by ${item.author} (Qty: ${item.qty})</div>
                </div>
            </div>
            <div style="font-weight: 600; color: #60a5fa; font-size: 0.95rem;">
                $${(item.price * item.qty).toFixed(2)}
            </div>
        </div>
    `).join('');

    // Timeline steps HTML
    const timelineHtml = (order.timeline || []).map(step => `
        <div style="display: flex; gap: 10px; margin-bottom: 8px; align-items: flex-start;">
            <div style="width: 20px; height: 20px; border-radius: 50%; background: ${step.done ? '#10b981' : '#334155'}; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; color: #fff; margin-top: 1px;">
                ${step.done ? '✓' : '•'}
            </div>
            <div style="flex: 1;">
                <div style="color: ${step.done ? '#ffffff' : '#94a3b8'}; font-weight: ${step.done ? '600' : '400'}; font-size: 0.88rem;">${step.label}</div>
                <div style="color: #64748b; font-size: 0.78rem;">${step.time}</div>
            </div>
        </div>
    `).join('');

    Swal.fire({
        title: `<div style="display: flex; justify-content: space-between; align-items: center; width: 100%; padding-right: 20px;">
                    <span style="font-size: 1.25rem;">Order Details: ${order.id}</span>
                    <span style="background: ${statusBg}; color: #fff; font-size: 0.8rem; padding: 4px 12px; border-radius: 12px; font-weight: 600;">${order.status}</span>
                </div>`,
        html: `
            <div style="text-align: left; font-size: 0.92rem; color: #ffffff; max-height: 70vh; overflow-y: auto; padding-right: 4px;">
                <!-- Summary Card -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin-bottom: 16px;">
                    <div style="background: #10235d; border: 1px solid #1e3a8a; border-radius: 6px; padding: 12px;">
                        <div style="color: #94a3b8; font-size: 0.8rem; margin-bottom: 4px;">CUSTOMER & ADDRESS</div>
                        <div style="font-weight: 700; color: #ffffff; margin-bottom: 2px;">${order.customer.name}</div>
                        <div style="color: #a0c0ff; font-size: 0.85rem;">📞 ${order.customer.phone}</div>
                        <div style="color: #cbd5e1; font-size: 0.85rem; margin-top: 4px;">📍 ${order.customer.address}</div>
                    </div>
                    <div style="background: #10235d; border: 1px solid #1e3a8a; border-radius: 6px; padding: 12px;">
                        <div style="color: #94a3b8; font-size: 0.8rem; margin-bottom: 4px;">PAYMENT & DATE</div>
                        <div style="font-weight: 600; color: #60a5fa; margin-bottom: 2px;">${order.paymentMethod}</div>
                        <div style="color: #a0c0ff; font-size: 0.85rem;">📅 Placed: ${order.date} ${order.time || ''}</div>
                        <div style="color: #f59e0b; font-size: 0.85rem; margin-top: 4px;">Note: "${order.customer.notes || 'None'}"</div>
                    </div>
                </div>

                <!-- Items Section -->
                <div style="background: #10235d; border: 1px solid #1e3a8a; border-radius: 6px; padding: 12px; margin-bottom: 16px;">
                    <div style="font-weight: 700; color: #a0c0ff; font-size: 0.85rem; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">Items in this order (${order.items.reduce((acc, i) => acc + i.qty, 0)})</div>
                    ${itemsHtml}
                    <!-- Pricing Total -->
                    <div style="margin-top: 10px; padding-top: 8px;">
                        <div style="display: flex; justify-content: space-between; color: #94a3b8; font-size: 0.88rem; margin-bottom: 4px;">
                            <span>Subtotal:</span>
                            <span>$${order.subtotal.toFixed(2)}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; color: #94a3b8; font-size: 0.88rem; margin-bottom: 6px;">
                            <span>Delivery Fee:</span>
                            <span style="color: #10b981;">Free</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; color: #ffffff; font-weight: 700; font-size: 1.05rem; border-top: 1px solid #1e3a8a; padding-top: 6px;">
                            <span>Total Amount:</span>
                            <span style="color: #60a5fa;">$${order.total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                <!-- Timeline / Tracking Section -->
                <div style="background: #10235d; border: 1px solid #1e3a8a; border-radius: 6px; padding: 12px; margin-bottom: 16px;">
                    <div style="font-weight: 700; color: #a0c0ff; font-size: 0.85rem; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px;">Delivery Tracking Timeline</div>
                    ${timelineHtml}
                </div>

                <!-- Modal Action Shortcuts -->
                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                    <button type="button" class="btn btn-secondary btn-sm" onclick="contactCustomer('${order.id}')" style="flex: 1; padding: 8px;">📞 Contact Customer</button>
                    <button type="button" class="btn btn-secondary btn-sm" onclick="viewCustomerLocationOnMap('${order.customer.address}')" style="flex: 1; padding: 8px;">🗺️ View Map</button>
                    <button type="button" class="btn btn-secondary btn-sm" onclick="printOrderDocket('${order.id}')" style="flex: 1; padding: 8px;">🖨️ Print Docket</button>
                </div>
            </div>
        `,
        width: '640px',
        showCloseButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Done',
        confirmButtonColor: '#3b82f6'
    });
}

// 3. Start Delivery Function
function startDelivery(orderNumber, buttonElement) {
    Swal.fire({
        title: 'Start Delivery?',
        text: `Are you ready to start delivery for order ${orderNumber}?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3b82f6',
        cancelButtonColor: '#475569',
        confirmButtonText: 'Yes, Start Delivery'
    }).then((result) => {
        if (result.isConfirmed) {
            const card = buttonElement ? buttonElement.closest('.order-card-vertical, .order-item, .delivery-item') : null;
            if (card) {
                const statusBadge = card.querySelector('.order-status-vertical, .order-status');
                if (statusBadge) {
                    statusBadge.className = 'order-status-vertical status-in-transit';
                    statusBadge.textContent = 'In Transit';
                }
                buttonElement.textContent = 'Mark as Delivered';
                buttonElement.className = 'btn btn-primary';
                buttonElement.onclick = function() { markOrderDelivered(orderNumber, this); };
            }
            
            const cleanId = orderNumber.replace('#', '').trim();
            if (orderDatabase[cleanId]) {
                orderDatabase[cleanId].status = 'In Transit';
                orderDatabase[cleanId].statusCode = 'in-transit';
            }
            
            updateFilterCounts();
            
            Swal.fire({
                title: 'Delivery Started!',
                text: `Order ${orderNumber} is now In Transit. Safe driving!`,
                icon: 'success',
                confirmButtonColor: '#3b82f6',
                background: '#1a1a2e',
                color: '#ffffff'
            });
        }
    });
}

// 4. Mark Order as Delivered Function
function markOrderDelivered(orderNumber, buttonElement) {
    Swal.fire({
        title: 'Mark as Delivered?',
        text: `Confirm that ${orderNumber} has been handed over to the customer?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#10b981',
        cancelButtonColor: '#475569',
        confirmButtonText: 'Yes, Mark Delivered'
    }).then((result) => {
        if (result.isConfirmed) {
            const card = buttonElement ? buttonElement.closest('.order-card-vertical, .order-item, .delivery-item') : null;
            if (card) {
                const statusBadge = card.querySelector('.order-status-vertical, .order-status');
                if (statusBadge) {
                    statusBadge.className = 'order-status-vertical status-delivered';
                    statusBadge.textContent = 'Delivered';
                }
                const completedBtn = document.createElement('button');
                completedBtn.className = 'btn-completed';
                completedBtn.textContent = 'Completed';
                buttonElement.parentNode.replaceChild(completedBtn, buttonElement);
            }
            
            const cleanId = orderNumber.replace('#', '').trim();
            if (orderDatabase[cleanId]) {
                orderDatabase[cleanId].status = 'Delivered';
                orderDatabase[cleanId].statusCode = 'delivered';
            }
            
            updateFilterCounts();
            
            Swal.fire({
                title: 'Order Delivered!',
                text: `Order ${orderNumber} marked as delivered successfully!`,
                icon: 'success',
                confirmButtonColor: '#3b82f6',
                background: '#1a1a2e',
                color: '#ffffff'
            });
        }
    });
}

// Alias for backwards compatibility
function markOrderAsDelivered(orderNumber, orderElement) {
    const btn = orderElement?.querySelector?.('.btn-primary') || orderElement;
    markOrderDelivered(orderNumber, btn);
}

// 5. View Customer Location on Map
function viewCustomerLocationOnMap(address) {
    const encodedAddress = encodeURIComponent(address || '123 Main St, City');
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    
    Swal.fire({
        title: 'Open Navigation Map?',
        text: `Open Google Maps for address: ${address}?`,
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3b82f6',
        cancelButtonColor: '#475569',
        confirmButtonText: 'Open Maps'
    }).then((result) => {
        if (result.isConfirmed) {
            window.open(mapsUrl, '_blank');
        }
    });
}

// 6. Print Delivery Docket
function printOrderDocket(orderId) {
    const card = Array.from(document.querySelectorAll('.order-card-vertical, .delivery-item')).find(el => el.textContent.includes(orderId));
    const order = getOrderData(orderId, card);
    const printWin = window.open('', '_blank');
    if (!printWin) {
        Swal.fire({ text: 'Please allow popups to print delivery dockets.', icon: 'warning' });
        return;
    }
    printWin.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Delivery Docket - ${order.id}</title>
            <style>
                body { font-family: 'Segoe UI', Arial, sans-serif; padding: 30px; color: #111; line-height: 1.5; }
                .header { border-bottom: 2px solid #000; padding-bottom: 12px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: flex-end; }
                .title { font-size: 24px; font-weight: bold; color: #0f172a; }
                .table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                .table th, .table td { border: 1px solid #cbd5e1; padding: 10px; text-align: left; }
                .table th { background: #f1f5f9; }
                .total { text-align: right; font-size: 18px; font-weight: bold; margin-top: 15px; }
                .signature { margin-top: 60px; display: flex; justify-content: space-between; }
                .sig-line { border-top: 1px dashed #000; width: 220px; text-align: center; padding-top: 5px; font-size: 13px; }
            </style>
        </head>
        <body>
            <div class="header">
                <div>
                    <div class="title">BookShop Delivery Docket</div>
                    <div>Order: <strong>${order.id}</strong> | Date: ${order.date}</div>
                </div>
                <div>
                    <div><strong>Status:</strong> ${order.status}</div>
                    <div><strong>Payment:</strong> ${order.paymentMethod}</div>
                </div>
            </div>
            <div>
                <h3>Customer Delivery Information:</h3>
                <p><strong>Name:</strong> ${order.customer.name}<br>
                <strong>Phone:</strong> ${order.customer.phone}<br>
                <strong>Delivery Address:</strong> ${order.customer.address}<br>
                <strong>Instructions:</strong> ${order.customer.notes || 'N/A'}</p>
            </div>
            <table class="table">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Author</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${order.items.map(i => `
                        <tr>
                            <td>${i.title}</td>
                            <td>${i.author}</td>
                            <td>${i.qty}</td>
                            <td>$${i.price.toFixed(2)}</td>
                            <td>$${(i.price * i.qty).toFixed(2)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            <div class="total">Total: $${order.total.toFixed(2)}</div>
            <div class="signature">
                <div class="sig-line">Customer Signature</div>
                <div class="sig-line">Delivery Personnel Signature</div>
            </div>
            <script>window.onload = function() { window.print(); };<\/script>
        </body>
        </html>
    `);
    printWin.document.close();
}

// 7. Search and Filter Feature
function setupFiltersAndSearch() {
    const searchInput = document.getElementById('orderSearchInput');
    const filterTabs = document.querySelectorAll('.order-filter-tabs .filter-tab');
    
    let currentFilter = 'all';
    let currentSearch = '';

    function applyFilters() {
        const cards = document.querySelectorAll('.order-card-vertical');
        let visibleCount = 0;

        cards.forEach(card => {
            const text = card.textContent.toLowerCase();
            const statusBadge = card.querySelector('.order-status-vertical');
            let cardStatus = 'pending';
            if (statusBadge) {
                if (statusBadge.classList.contains('status-in-transit') || statusBadge.textContent.toLowerCase().includes('in transit')) {
                    cardStatus = 'in-transit';
                } else if (statusBadge.classList.contains('status-delivered') || statusBadge.textContent.toLowerCase().includes('delivered')) {
                    cardStatus = 'delivered';
                } else {
                    cardStatus = 'pending';
                }
            }

            const matchesFilter = (currentFilter === 'all') || (cardStatus === currentFilter);
            const matchesSearch = !currentSearch || text.includes(currentSearch);

            if (matchesFilter && matchesSearch) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        let emptyMsg = document.getElementById('noOrdersFoundMsg');
        if (visibleCount === 0) {
            if (!emptyMsg) {
                emptyMsg = document.createElement('div');
                emptyMsg.id = 'noOrdersFoundMsg';
                emptyMsg.style.cssText = 'text-align: center; padding: 2.5rem 1rem; color: #94a3b8; font-size: 1rem; background: #10235d; border-radius: 6px; border: 1px dashed #1e3a8a; margin-top: 1rem;';
                emptyMsg.innerHTML = '<span style="font-size: 2rem; display: block; margin-bottom: 8px;">🔍</span>No orders match your filter criteria.';
                const list = document.querySelector('.order-list-vertical');
                if (list) list.appendChild(emptyMsg);
            } else {
                emptyMsg.style.display = 'block';
            }
        } else if (emptyMsg) {
            emptyMsg.style.display = 'none';
        }
    }

    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            currentSearch = e.target.value.toLowerCase().trim();
            applyFilters();
        });
    }

    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.getAttribute('data-filter') || 'all';
            applyFilters();
        });
    });

    updateFilterCounts();
}

function updateFilterCounts() {
    const cards = document.querySelectorAll('.order-card-vertical');
    let pending = 0;
    let inTransit = 0;
    let delivered = 0;

    cards.forEach(card => {
        const statusBadge = card.querySelector('.order-status-vertical');
        if (statusBadge) {
            if (statusBadge.classList.contains('status-in-transit') || statusBadge.textContent.toLowerCase().includes('in transit')) {
                inTransit++;
            } else if (statusBadge.classList.contains('status-delivered') || statusBadge.textContent.toLowerCase().includes('delivered')) {
                delivered++;
            } else {
                pending++;
            }
        }
    });

    const elAll = document.getElementById('count-all');
    const elPending = document.getElementById('count-pending');
    const elInTransit = document.getElementById('count-in-transit');
    const elDelivered = document.getElementById('count-delivered');

    if (elAll) elAll.textContent = cards.length;
    if (elPending) elPending.textContent = pending;
    if (elInTransit) elInTransit.textContent = inTransit;
    if (elDelivered) elDelivered.textContent = delivered;
}

// 8. Event delegation and Initialization
document.addEventListener('DOMContentLoaded', function() {
    setupFiltersAndSearch();

    // Universal button delegation for any button clicks without explicit onclick
    document.addEventListener('click', function(e) {
        const target = e.target;
        if (!target || target.tagName !== 'BUTTON') return;
        
        // If inline onclick exists, let it execute naturally
        if (target.getAttribute('onclick')) return;

        const text = target.textContent.trim().toLowerCase();
        const orderCard = target.closest('.order-card-vertical, .order-item, .delivery-item');
        if (!orderCard) return;

        const h = orderCard.querySelector('h3, h4, .order-id, .order-id-vertical');
        const orderId = h ? h.textContent.trim() : 'Unknown';

        if (text === 'contact customer') {
            e.preventDefault();
            contactCustomer(orderId);
        } else if (text === 'view details' || text === 'details') {
            e.preventDefault();
            viewOrderDetails(orderId);
        } else if (text === 'start delivery') {
            e.preventDefault();
            startDelivery(orderId, target);
        } else if (text === 'mark as delivered' || text === 'mark delivered') {
            e.preventDefault();
            markOrderDelivered(orderId, target);
        } else if (text === 'view map' || text === 'map') {
            e.preventDefault();
            const addressEl = Array.from(orderCard.querySelectorAll('.detail-label-vertical')).find(el => el.textContent.includes('Address'));
            const address = addressEl ? addressEl.nextElementSibling.textContent.trim() : '123 Main St, City';
            viewCustomerLocationOnMap(address);
        }
    });
});

// Legacy helper stubs
function showAlert(message, type = 'success') {
    if (typeof Swal !== 'undefined') {
        Swal.fire({
            text: message,
            icon: type === 'danger' ? 'error' : (type === 'warning' ? 'warning' : 'info'),
            confirmButtonColor: '#3b82f6',
            background: '#1a1a2e',
            color: '#ffffff'
        });
    }
}