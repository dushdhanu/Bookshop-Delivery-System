const fs = require('fs');

// 1. Update sidebars in existing files
const files = ['customer/profile.html', 'customer/orders.html'];

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    content = content.replace(/<a href="#" class="account-item-vertical">\s*<span class="account-icon">❤️<\/span>\s*<span>Wishlist<\/span>\s*<\/a>/g, 
        '<a href="wishlist.html" class="account-item-vertical">\n                            <span class="account-icon">❤️</span>\n                            <span>Wishlist</span>\n                        </a>');
        
    content = content.replace(/<a href="#" class="account-item-vertical">\s*<span class="account-icon">📍<\/span>\s*<span>Addresses<\/span>\s*<\/a>/g, 
        '<a href="addresses.html" class="account-item-vertical">\n                            <span class="account-icon">📍</span>\n                            <span>Addresses</span>\n                        </a>');
        
    content = content.replace(/<a href="#" class="account-item-vertical">\s*<span class="account-icon">💳<\/span>\s*<span>Payment Methods<\/span>\s*<\/a>/g, 
        '<a href="payment-methods.html" class="account-item-vertical">\n                            <span class="account-icon">💳</span>\n                            <span>Payment Methods</span>\n                        </a>');
        
    fs.writeFileSync(file, content);
}

// 2. Create the missing pages
const templateFile = 'customer/profile.html';
const templateContent = fs.readFileSync(templateFile, 'utf8');

function createPage(name, title, icon, contentHtml) {
    let newContent = templateContent;
    
    // Update active state in sidebar
    newContent = newContent.replace('class="account-item-vertical active"', 'class="account-item-vertical"');
    newContent = newContent.replace(
        new RegExp(`<a href="${name}.html" class="account-item-vertical">`, 'g'),
        `<a href="${name}.html" class="account-item-vertical active">`
    );
    
    // Replace main content carefully.
    // In profile.html, the main-content div starts like this and goes until the end of the section
    const mainContentStart = newContent.indexOf('<div class="main-content">');
    const sectionEnd = newContent.indexOf('</section>', mainContentStart);
    
    const newMain = `<div class="main-content">
                    <div class="card" style="min-height: 400px; display: flex; flex-direction: column;">
                        <div class="card-header" style="border-bottom: 1px solid #1e3a8a; padding-bottom: 1rem; margin-bottom: 1rem;">
                            <h2 class="card-title" style="margin: 0; color: #ffffff;">${icon} ${title}</h2>
                        </div>
                        <div class="card-body" style="flex: 1; display: flex; justify-content: center; align-items: center;">
                            ${contentHtml}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    newContent = newContent.substring(0, mainContentStart) + newMain + newContent.substring(sectionEnd);
    
    // Also change page title
    newContent = newContent.replace(/<title>.*?<\/title>/, `<title>${title} - BookShop</title>`);
    
    fs.writeFileSync(`customer/${name}.html`, newContent);
}

createPage('wishlist', 'My Wishlist', '❤️', '<div style="text-align: center; padding: 3rem; color: #94a3b8;"><div style="font-size: 3rem; margin-bottom: 1rem;">📚</div><h3 style="color: #ffffff; margin-bottom: 0.5rem;">Your Wishlist is Empty</h3><p style="margin-bottom: 1.5rem;">Save your favorite books here to buy them later.</p><button class="btn btn-primary" onclick="window.location.href=\'books.html\'">Browse Books</button></div>');

createPage('addresses', 'My Addresses', '📍', '<div style="text-align: center; padding: 3rem; color: #94a3b8;"><div style="font-size: 3rem; margin-bottom: 1rem;">🏠</div><h3 style="color: #ffffff; margin-bottom: 0.5rem;">No Saved Addresses</h3><p style="margin-bottom: 1.5rem;">You have not saved any delivery addresses yet.</p><button class="btn btn-primary">Add New Address</button></div>');

createPage('payment-methods', 'Payment Methods', '💳', '<div style="text-align: center; padding: 3rem; color: #94a3b8;"><div style="font-size: 3rem; margin-bottom: 1rem;">🔒</div><h3 style="color: #ffffff; margin-bottom: 0.5rem;">No Saved Payment Methods</h3><p style="margin-bottom: 1.5rem;">You have not saved any credit cards or payment methods.</p><button class="btn btn-primary">Add Payment Method</button></div>');

console.log("Pages created and sidebars updated successfully.");
