const fs = require('fs');

let content = fs.readFileSync('session.js', 'utf8');

const regex = /\/\/ Delete account function[\s\S]*?\}\s*\}\s*$/m;
const replacement = `// Delete account function
function deleteAccount() {
    Swal.fire({
        title: 'Confirmation',
        text: 'Are you sure you want to delete your account? This action cannot be undone.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3b82f6',
        cancelButtonColor: '#ef4444',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.isConfirmed) {
            console.log('Deleting account');
            const deleteBtn = document.getElementById('deleteAccountBtn');
            const originalText = deleteBtn.textContent;
            deleteBtn.textContent = 'Deleting...';
            deleteBtn.disabled = true;
            
            setTimeout(() => {
                showAlert('Account deleted successfully. You have been logged out.', 'success');
                // logout();
            }, 1500);
        }
    });
}`;

content = content.replace(regex, replacement);
fs.writeFileSync('session.js', content);
console.log('Fixed session.js');
