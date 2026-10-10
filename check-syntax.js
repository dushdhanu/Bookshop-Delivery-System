const fs = require('fs');
const content = fs.readFileSync('customer/notifications.html', 'utf8');
const match = content.match(/<script>([\s\S]*?)<\/script>/g);
const script = match[match.length - 1];
fs.writeFileSync('temp_notif.js', script.replace(/<\/?script>/g, ''));
