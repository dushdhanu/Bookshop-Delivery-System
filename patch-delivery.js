const fs = require('fs');
let c = fs.readFileSync('delivery person/js/orders.js', 'utf8');

c = c.replace(/const orderItem = this\.closest\('\.order-item'\);/g, `const orderItem = this.closest('.order-item') || this.closest('.order-card-vertical') || this.closest('.delivery-item');
            if (!orderItem) {
                // If it's a View Map button, open map directly
                if (this.textContent.trim() === 'View Map' || this.textContent.trim() === 'Map') {
                    const addressElement = this.closest('.delivery-info') ? this.closest('.delivery-info').querySelectorAll('p')[0] : null;
                    const address = addressElement ? addressElement.textContent.split('-')[1]?.trim() || '123 Main St, City' : '123 Main St, City';
                    const encodedAddress = encodeURIComponent(address);
                    window.open('https://www.google.com/maps/search/?api=1&query=' + encodedAddress, '_blank');
                }
                return;
            }`);

c = c.replace(/const orderNumber = orderItem\.querySelector\('h3'\)\.textContent;/g, `const h = orderItem.querySelector('h3') || orderItem.querySelector('h4');
            const i = orderItem.querySelector('.order-id') || orderItem.querySelector('.order-id-vertical');
            const orderNumber = (h ? h.textContent : (i ? i.textContent : 'Unknown')).trim();
            
            // Check if it's the View Map button
            if (this.textContent.trim() === 'View Map') {
                const addressElement = Array.from(orderItem.querySelectorAll('.detail-label-vertical')).find(el => el.textContent.includes('Address'));
                const address = addressElement ? addressElement.nextElementSibling.textContent.trim() : '123 Delivery St, City';
                const encodedAddress = encodeURIComponent(address);
                window.open('https://www.google.com/maps/search/?api=1&query=' + encodedAddress, '_blank');
                return;
            }`);

fs.writeFileSync('delivery person/js/orders.js', c);
