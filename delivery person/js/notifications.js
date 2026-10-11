// Delivery Person Notifications JavaScript

const deliveryOrderDetails = {
    'ORD-8923': {
        id: '#ORD-8923',
        customer: 'David Miller',
        phone: '+94 77 654 3210',
        address: '123 Main St, City',
        pickup: 'BookShop Central Warehouse (Bay 4)',
        items: [
            { name: 'Clean Code: A Handbook of Agile Software Craftsmanship', qty: 1, price: 18.50 },
            { name: 'Refactoring: Improving the Design of Existing Code', qty: 1, price: 16.00 }
        ],
        total: '$34.50 (Paid Online - Verified)',
        deadline: 'Today by 4:00 PM',
        priority: 'Standard Delivery',
        notes: 'Leave with front desk security if unavailable.'
    },
    'ORD-8567': {
        id: '#ORD-8567',
        customer: 'Amanda Clark',
        phone: '+94 71 234 5678',
        address: '89 River View Rd, North Town',
        pickup: 'BookShop Central Warehouse (Bay 1)',
        items: [
            { name: 'Harrison\'s Principles of Internal Medicine', qty: 1, price: 78.00 }
        ],
        total: '$78.00 (Cash on Delivery - Collect Exact Amount)',
        deadline: 'Today by 5:00 PM Sharp',
        priority: 'High Priority / Express Same-Day',
        notes: 'Please call recipient 15 minutes before arrival.'
    },
    'ORD-8721': {
        id: '#ORD-8721',
        customer: 'Robert Wilson',
        phone: '+94 76 345 6789',
        address: '45 Lake View Terr, Cityville',
        pickup: 'Dispatched & En Route',
        items: [
            { name: 'Sapiens: A Brief History of Humankind', qty: 1, price: 19.99 },
            { name: 'Homo Deus: A Brief History of Tomorrow', qty: 1, price: 12.01 }
        ],
        total: '$32.00 (Paid Online)',
        deadline: 'Estimated arrival in 25 mins',
        priority: 'In Transit',
        notes: 'Gate code #4412.'
    },
    'ORD-8619': {
        id: '#ORD-8619',
        customer: 'Sarah Johnson',
        phone: '+94 77 456 7890',
        address: '456 Oak Ave, Springfield',
        items: [
            { name: 'Atomic Habits', qty: 2, price: 18.75 }
        ],
        total: '$42.50 (Collected & Confirmed)',
        deliveryTime: 'Today, 01:15 PM',
        rating: '5.0 / 5.0 ★★★★★',
        notes: 'Prompt and courteous delivery, thank you!'
    }
};

// 1. Filter notifications
function filterNotifications(category) {
    const filterTags = document.querySelectorAll('.category-tags .tag');
    filterTags.forEach(t => {
        const cat = t.getAttribute('data-category') || t.textContent.trim().toLowerCase();
        if (cat === category || t.textContent.trim().toLowerCase() === category.toLowerCase()) {
            t.classList.add('active');
        } else {
            t.classList.remove('active');
        }
    });

    const cards = document.querySelectorAll('.notification-card');
    let visibleCount = 0;

    cards.forEach(card => {
        const cardCat = (card.getAttribute('data-category') || '').toLowerCase();
        const badgeText = card.querySelector('.notification-badge')?.textContent.toLowerCase() || '';
        const titleText = card.querySelector('.notification-title')?.textContent.toLowerCase() || '';

        let show = false;

        if (category === 'all' || category === 'all notifications') {
            show = true;
        } else if (category === 'new' || category === 'new deliveries') {
            show = cardCat === 'new' || badgeText.includes('new') || badgeText.includes('urgent') || titleText.includes('assignment') || titleText.includes('request');
        } else if (category === 'progress' || category === 'in progress') {
            show = cardCat === 'progress' || badgeText.includes('route') || badgeText.includes('progress') || badgeText.includes('transit') || titleText.includes('route');
        } else if (category === 'completed') {
            show = cardCat === 'completed' || badgeText.includes('completed') || badgeText.includes('delivered') || titleText.includes('completed');
        } else if (category === 'account') {
            show = cardCat === 'account' || badgeText.includes('performance') || badgeText.includes('security') || badgeText.includes('system') || titleText.includes('report') || titleText.includes('update');
        }

        if (show) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    let emptyMsg = document.getElementById('notifEmptyState');
    if (visibleCount === 0) {
        if (!emptyMsg) {
            emptyMsg = document.createElement('div');
            emptyMsg.id = 'notifEmptyState';
            emptyMsg.style.cssText = 'text-align: center; color: #94a3b8; padding: 2.5rem 1rem; background-color: #10235d; border-radius: 5px; border: 1px dashed #1e3a8a; margin-top: 1rem;';
            emptyMsg.innerHTML = '<span style="font-size: 2.2rem; display: block; margin-bottom: 8px;">🔔</span>No notifications found in this category.';
            const list = document.querySelector('.notification-list');
            if (list) list.appendChild(emptyMsg);
        } else {
            emptyMsg.style.display = 'block';
        }
    } else if (emptyMsg) {
        emptyMsg.style.display = 'none';
    }
}

// 2. Mark all notifications as read
function markAllAsRead() {
    Swal.fire({
        title: 'Mark All as Read?',
        text: 'Are you sure you want to mark all delivery notifications as read?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3b82f6',
        cancelButtonColor: '#475569',
        confirmButtonText: 'Yes, Mark All'
    }).then((result) => {
        if (result.isConfirmed) {
            const cards = document.querySelectorAll('.notification-card');
            cards.forEach(card => {
                card.style.opacity = '0.85';
                const badge = card.querySelector('.notification-badge');
                if (badge && !badge.textContent.includes('✓ Read')) {
                    badge.style.opacity = '0.7';
                }
            });

            const markBtn = document.querySelector('.mark-as-read');
            if (markBtn) {
                markBtn.textContent = 'All Read ✓';
                markBtn.disabled = true;
                markBtn.style.opacity = '0.6';
            }

            Swal.fire({
                title: 'All Read!',
                text: 'All delivery notifications have been marked as read.',
                icon: 'success',
                confirmButtonColor: '#3b82f6',
                background: '#1a1a2e',
                color: '#ffffff'
            });
        }
    });
}

// 3. View Notification Details
function viewNotificationDetails(orderId) {
    const rawId = String(orderId || '').replace(/[^a-zA-Z0-9-]/g, '').toUpperCase();
    const details = deliveryOrderDetails[rawId] || {
        id: '#' + rawId,
        customer: 'Customer Recipient',
        phone: '+94 77 123 4567',
        address: '123 Main St, City',
        pickup: 'BookShop Central Warehouse',
        items: [{ name: 'Book Package', qty: 1, price: 25.00 }],
        total: '$25.00',
        deadline: 'Today by 5:00 PM',
        priority: 'Standard Delivery',
        notes: 'Handle with care.'
    };

    const itemsHtml = (details.items || []).map(i => `
        <div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #1e3a8a; font-size: 0.9rem;">
            <span>📖 ${i.name} (Qty: ${i.qty})</span>
            <span style="color: #60a5fa; font-weight: 600;">$${(i.price * i.qty).toFixed(2)}</span>
        </div>
    `).join('') || `<div style="font-size: 0.9rem; color: #cbd5e1;">${details.items}</div>`;

    Swal.fire({
        title: `<div style="display: flex; align-items: center; justify-content: space-between; width: 100%; padding-right: 15px;">
                    <span style="font-size: 1.25rem;">Assignment: ${details.id}</span>
                    <span style="background: #3b82f6; font-size: 0.8rem; padding: 3px 10px; border-radius: 12px; color: #fff;">${details.priority}</span>
                </div>`,
        html: `
            <div style="text-align: left; color: #ffffff; font-size: 0.92rem; max-height: 68vh; overflow-y: auto;">
                <!-- Recipient Card -->
                <div style="background: #10235d; border: 1px solid #1e3a8a; border-radius: 6px; padding: 12px; margin-bottom: 12px;">
                    <div style="color: #94a3b8; font-size: 0.78rem; text-transform: uppercase; margin-bottom: 4px;">CUSTOMER & DELIVERY POINT</div>
                    <div style="font-weight: 700; font-size: 1.05rem; color: #ffffff;">${details.customer}</div>
                    <div style="color: #a0c0ff; margin-top: 2px;">📞 <a href="tel:${details.phone}" style="color: #60a5fa; text-decoration: underline;">${details.phone}</a></div>
                    <div style="color: #cbd5e1; margin-top: 4px;">📍 <strong>Destination:</strong> ${details.address}</div>
                    <div style="color: #cbd5e1; margin-top: 2px;">🏢 <strong>Pickup Point:</strong> ${details.pickup}</div>
                    <div style="color: #f59e0b; margin-top: 4px;">⏰ <strong>Deadline:</strong> ${details.deadline}</div>
                    <div style="color: #cbd5e1; margin-top: 4px;">📝 <strong>Instructions:</strong> "${details.notes}"</div>
                </div>

                <!-- Items & Payment -->
                <div style="background: #10235d; border: 1px solid #1e3a8a; border-radius: 6px; padding: 12px; margin-bottom: 14px;">
                    <div style="color: #94a3b8; font-size: 0.78rem; text-transform: uppercase; margin-bottom: 6px;">PACKAGE CONTENTS</div>
                    ${itemsHtml}
                    <div style="display: flex; justify-content: space-between; margin-top: 8px; padding-top: 6px; font-weight: 700; color: #ffffff; border-top: 1px solid #1e3a8a;">
                        <span>Payment Status:</span>
                        <span style="color: #60a5fa;">${details.total}</span>
                    </div>
                </div>

                <!-- Shortcuts -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                    <button type="button" class="btn btn-primary" onclick="startDeliveryFromNotification('${rawId}')" style="padding: 9px; font-size: 0.9rem;">🚗 Start Delivery</button>
                    <button type="button" class="btn btn-secondary" onclick="window.open('https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('${details.address}'), '_blank')" style="padding: 9px; font-size: 0.9rem;">🗺️ Navigate on Map</button>
                </div>
            </div>
        `,
        width: '600px',
        showCloseButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Close',
        confirmButtonColor: '#475569'
    });
}

// 4. Start Delivery from Notification
function startDeliveryFromNotification(orderId, buttonEl) {
    const rawId = String(orderId || '').replace(/[^a-zA-Z0-9-]/g, '').toUpperCase();
    
    Swal.fire({
        title: 'Start Delivery?',
        text: `Are you ready to start delivery for order #${rawId}?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3b82f6',
        cancelButtonColor: '#475569',
        confirmButtonText: 'Yes, Start Delivery'
    }).then((result) => {
        if (result.isConfirmed) {
            const cards = document.querySelectorAll('.notification-card');
            cards.forEach(card => {
                if (card.textContent.includes(rawId)) {
                    card.setAttribute('data-category', 'progress');
                    const badge = card.querySelector('.notification-badge');
                    if (badge) {
                        badge.className = 'notification-badge badge-info';
                        badge.textContent = 'In Progress';
                    }
                    const startBtn = Array.from(card.querySelectorAll('button')).find(b => b.textContent.includes('Start Delivery'));
                    if (startBtn) {
                        startBtn.textContent = 'In Transit ✓';
                        startBtn.className = 'btn btn-sm btn-secondary';
                        startBtn.disabled = true;
                    }
                }
            });

            Swal.fire({
                title: 'Delivery Started!',
                text: `Order #${rawId} is now In Transit. You can manage and complete it in your Deliveries dashboard.`,
                icon: 'success',
                showCancelButton: true,
                confirmButtonColor: '#3b82f6',
                cancelButtonColor: '#475569',
                confirmButtonText: 'View in Orders',
                cancelButtonText: 'Stay on Notifications',
                background: '#1a1a2e',
                color: '#ffffff'
            }).then((navRes) => {
                if (navRes.isConfirmed) {
                    window.location.href = 'orders.html';
                }
            });
        }
    });
}

// 5. View Route
function viewRouteDetails(orderId) {
    Swal.fire({
        title: `<div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
                    <span>🗺️ Optimized Route: #${orderId}</span>
                </div>`,
        html: `
            <div style="text-align: left; color: #ffffff; font-size: 0.92rem;">
                <div style="background: #10235d; border: 1px solid #1e3a8a; border-radius: 6px; padding: 14px; margin-bottom: 14px;">
                    <div style="color: #10b981; font-weight: 700; margin-bottom: 8px;">⚡ Estimated time saved: 15 Minutes</div>
                    <div style="display: flex; flex-direction: column; gap: 10px;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <span style="background: #3b82f6; color: #fff; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: bold;">1</span>
                            <div>
                                <div style="font-weight: 600;">Warehouse Central Bay</div>
                                <div style="color: #94a3b8; font-size: 0.8rem;">Pickup packages (Completed)</div>
                            </div>
                        </div>
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <span style="background: #8b5cf6; color: #fff; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: bold;">2</span>
                            <div>
                                <div style="font-weight: 600;">456 Oak Ave, Town (Sarah Johnson)</div>
                                <div style="color: #a0c0ff; font-size: 0.8rem;">ETA: 12 minutes (Next Stop)</div>
                            </div>
                        </div>
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <span style="background: #3b82f6; color: #fff; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: bold;">3</span>
                            <div>
                                <div style="font-weight: 600;">123 Main St, City (David Miller)</div>
                                <div style="color: #94a3b8; font-size: 0.8rem;">ETA: 28 minutes</div>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="button" class="btn btn-primary" onclick="window.open('https://www.google.com/maps/dir/Colombo/Sri+Lanka', '_blank')" style="width: 100%; padding: 10px; font-weight: 600;">
                    🗺️ Open Turn-by-Turn GPS Navigation
                </button>
            </div>
        `,
        width: '540px',
        showConfirmButton: false,
        showCloseButton: true
    });
}

// 6. View Delivery Receipt
function viewReceiptDetails(orderId) {
    const rawId = String(orderId || 'ORD-8619').replace(/[^a-zA-Z0-9-]/g, '').toUpperCase();
    const details = deliveryOrderDetails[rawId] || deliveryOrderDetails['ORD-8619'];

    Swal.fire({
        title: `<div style="text-align: center;"><span>🧾 Delivery Receipt: #${rawId}</span></div>`,
        html: `
            <div style="text-align: left; color: #ffffff; font-size: 0.92rem;">
                <div style="background: #10235d; border: 1px solid #1e3a8a; border-radius: 6px; padding: 14px; margin-bottom: 14px;">
                    <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #1e3a8a; padding-bottom: 6px; margin-bottom: 8px;">
                        <span style="color: #94a3b8;">Delivered To:</span>
                        <span style="font-weight: 700; color: #ffffff;">${details.customer}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #1e3a8a; padding-bottom: 6px; margin-bottom: 8px;">
                        <span style="color: #94a3b8;">Delivery Address:</span>
                        <span style="color: #ffffff;">${details.address}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #1e3a8a; padding-bottom: 6px; margin-bottom: 8px;">
                        <span style="color: #94a3b8;">Completed Time:</span>
                        <span style="color: #ffffff;">${details.deliveryTime || 'Today, 01:15 PM'}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #1e3a8a; padding-bottom: 6px; margin-bottom: 8px;">
                        <span style="color: #94a3b8;">Customer Rating:</span>
                        <span style="color: #fbbf24; font-weight: 600;">${details.rating || '5.0 ★★★★★'}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; padding-top: 4px; font-weight: 700; font-size: 1.05rem;">
                        <span style="color: #94a3b8;">Total Amount:</span>
                        <span style="color: #10b981;">${details.total}</span>
                    </div>
                </div>
                <div style="color: #a0c0ff; font-style: italic; text-align: center; margin-bottom: 12px;">"${details.notes}"</div>
                <button type="button" class="btn btn-secondary" onclick="window.print()" style="width: 100%; padding: 10px;">
                    🖨️ Print Delivery Receipt Slip
                </button>
            </div>
        `,
        width: '520px',
        showCloseButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Done',
        confirmButtonColor: '#3b82f6'
    });
}

// 7. View Performance Report
function viewPerformanceReport() {
    Swal.fire({
        title: '📊 Weekly Courier Performance Report',
        html: `
            <div style="text-align: left; color: #ffffff; font-size: 0.92rem;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 14px;">
                    <div style="background: #10235d; border: 1px solid #1e3a8a; border-radius: 6px; padding: 12px; text-align: center;">
                        <div style="color: #94a3b8; font-size: 0.8rem;">DELIVERIES COMPLETED</div>
                        <div style="font-size: 1.6rem; font-weight: 700; color: #3b82f6; margin-top: 4px;">45</div>
                        <div style="color: #10b981; font-size: 0.75rem;">+12% vs last week</div>
                    </div>
                    <div style="background: #10235d; border: 1px solid #1e3a8a; border-radius: 6px; padding: 12px; text-align: center;">
                        <div style="color: #94a3b8; font-size: 0.8rem;">ON-TIME RATE</div>
                        <div style="font-size: 1.6rem; font-weight: 700; color: #10b981; margin-top: 4px;">98.2%</div>
                        <div style="color: #10b981; font-size: 0.75rem;">Top Tier Delivery</div>
                    </div>
                    <div style="background: #10235d; border: 1px solid #1e3a8a; border-radius: 6px; padding: 12px; text-align: center;">
                        <div style="color: #94a3b8; font-size: 0.8rem;">CUSTOMER RATING</div>
                        <div style="font-size: 1.6rem; font-weight: 700; color: #fbbf24; margin-top: 4px;">4.9 ★</div>
                        <div style="color: #94a3b8; font-size: 0.75rem;">From 38 reviews</div>
                    </div>
                    <div style="background: #10235d; border: 1px solid #1e3a8a; border-radius: 6px; padding: 12px; text-align: center;">
                        <div style="color: #94a3b8; font-size: 0.8rem;">BONUS EARNED</div>
                        <div style="font-size: 1.6rem; font-weight: 700; color: #60a5fa; margin-top: 4px;">$65.00</div>
                        <div style="color: #10b981; font-size: 0.75rem;">Credited to Account</div>
                    </div>
                </div>
                <div style="background: #10235d; border: 1px solid #1e3a8a; border-radius: 6px; padding: 10px; text-align: center; color: #a0c0ff; font-size: 0.88rem;">
                    🏆 Badge Awarded: <strong>Top 5% Delivery Partner in Colombo Zone</strong>
                </div>
            </div>
        `,
        width: '540px',
        showCloseButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Great!',
        confirmButtonColor: '#3b82f6'
    });
}

// 8. View System Notice
function viewSystemNoticeDetails(title, content) {
    Swal.fire({
        title: title || 'System Update',
        text: content || 'System notification information.',
        icon: 'info',
        confirmButtonColor: '#3b82f6',
        background: '#1a1a2e',
        color: '#ffffff'
    });
}

// 9. Sync System Updates for Delivery Person
function syncSystemNotifications() {
    const list = document.querySelector('.notification-list');
    if (!list) return;

    try {
        const sysNotifs = JSON.parse(localStorage.getItem('systemNotifications')) || [];
        sysNotifs.reverse().forEach(n => {
            const existing = Array.from(list.querySelectorAll('.notification-title')).find(el => el.textContent === n.title);
            if (!existing) {
                const card = document.createElement('div');
                card.className = 'notification-card';
                card.setAttribute('data-category', 'account');
                card.innerHTML = `
                    <div class="notification-header">
                        <h3 class="notification-title" style="color: #60a5fa;">${n.title}</h3>
                        <span class="notification-date">${n.time || 'Recently'}</span>
                    </div>
                    <p class="notification-content">${n.content}</p>
                    <div class="notification-actions">
                        <span class="notification-badge badge-info">${n.type || 'System Update'}</span>
                        <button class="btn btn-sm btn-secondary" onclick="viewSystemNoticeDetails('${(n.title || '').replace(/'/g, "\\'")}', '${(n.content || '').replace(/'/g, "\\'")}')">View Details</button>
                    </div>
                `;
                list.insertBefore(card, list.firstChild);
            }
        });
    } catch (e) {
        console.warn('System notifications sync error:', e);
    }
}

// 10. Initialization & Universal Event Delegation
document.addEventListener('DOMContentLoaded', () => {
    syncSystemNotifications();

    // Setup Category Tag listeners
    const tags = document.querySelectorAll('.category-tags .tag');
    tags.forEach(tag => {
        tag.style.cursor = 'pointer';
        tag.addEventListener('click', function() {
            const cat = this.getAttribute('data-category') || this.textContent.trim().toLowerCase();
            filterNotifications(cat);
        });
    });

    // Setup Mark All as Read button listener
    const markReadBtn = document.querySelector('.mark-as-read');
    if (markReadBtn) {
        markReadBtn.addEventListener('click', markAllAsRead);
    }

    // Universal button delegation for any notification card action
    document.addEventListener('click', function(e) {
        const btn = e.target;
        if (!btn || btn.tagName !== 'BUTTON') return;
        if (btn.getAttribute('onclick')) return;

        const actionText = btn.textContent.trim().toLowerCase();
        const card = btn.closest('.notification-card');
        if (!card) return;

        const title = card.querySelector('.notification-title')?.textContent.trim() || '';
        const content = card.querySelector('.notification-content')?.textContent.trim() || '';
        
        const orderMatch = content.match(/#ORD-([0-9A-Za-z-]+)/i) || title.match(/#ORD-([0-9A-Za-z-]+)/i);
        const orderId = orderMatch ? 'ORD-' + orderMatch[1] : 'ORD-8923';

        if (actionText === 'view details') {
            e.preventDefault();
            viewNotificationDetails(orderId);
        } else if (actionText === 'start delivery') {
            e.preventDefault();
            startDeliveryFromNotification(orderId, btn);
        } else if (actionText === 'view route') {
            e.preventDefault();
            viewRouteDetails(orderId);
        } else if (actionText === 'view receipt') {
            e.preventDefault();
            viewReceiptDetails(orderId);
        } else if (actionText === 'view report') {
            e.preventDefault();
            viewPerformanceReport();
        }
    });
});
