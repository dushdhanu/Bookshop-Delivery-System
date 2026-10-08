const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        if (isDirectory) {
            walkDir(dirPath, callback);
        } else {
            callback(dirPath);
        }
    });
}

const swalScript = `<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<style>
    /* Custom SweetAlert2 Theme to match BookShop */
    .swal2-popup {
        background-color: #1a1a2e !important;
        color: #ffffff !important;
        border: 1px solid #2e5a8a !important;
        border-radius: 10px !important;
    }
    .swal2-title, .swal2-html-container {
        color: #ffffff !important;
    }
    .swal2-input, .swal2-textarea {
        background-color: #10235d !important;
        color: #ffffff !important;
        border: 1px solid #3b82f6 !important;
    }
    .swal2-confirm {
        background-color: #3b82f6 !important;
    }
    .swal2-cancel {
        background-color: #475569 !important;
    }
</style>
<script>
    // Global alert override
    window.alert = function(msg) {
        Swal.fire({
            text: msg,
            confirmButtonColor: '#3b82f6',
            background: '#1a1a2e',
            color: '#ffffff'
        });
    };
</script>`;

walkDir(__dirname, (filePath) => {
    if (filePath.includes('node_modules') || filePath.includes('.git')) return;
    
    // Inject SweetAlert2 into HTML files
    if (filePath.endsWith('.html')) {
        let content = fs.readFileSync(filePath, 'utf8');
        if (!content.includes('sweetalert2')) {
            content = content.replace('</head>', swalScript + '\n</head>');
            fs.writeFileSync(filePath, content, 'utf8');
            console.log('Injected Swal into', filePath);
        }
    }
    
    // Refactor JS files and HTML files for confirm and prompt
    if (filePath.endsWith('.js') || filePath.endsWith('.html')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;
        
        // 1. Refactor confirm: Swal.fire({
                title: 'Confirmation',
                text: '...',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3b82f6',
                cancelButtonColor: '#ef4444',
                confirmButtonText: 'Yes'
            }).then((result) => {
                if (result.isConfirmed) {
                    ...
                }
            })
        // Simple case: single line block
        content = content.replace(/if\s*\(\s*confirm\s*\(\s*(['"`].*?['"`])\s*\)\s*\)\s*\{\s*([\s\S]*?)\s*\}/g, (match, msg, block) => {
            return `Swal.fire({
                title: 'Confirmation',
                text: ${msg},
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3b82f6',
                cancelButtonColor: '#ef4444',
                confirmButtonText: 'Yes'
            }).then((result) => {
                if (result.isConfirmed) {
                    ${block}
                }
            })`;
        });

        // 2. Refactor prompt: // PROMPT_REPLACED_WAITING_MANUAL_FIX 
        const feedback = null; // Swal prompt needs manual async/then wiring for '...'
        content = content.replace(/(const|let|var)\s+(\w+)\s*=\s*prompt\s*\(\s*(['"`].*?['"`])\s*\)\s*;/g, (match, decl, varName, msg) => {
            return `// PROMPT_REPLACED_WAITING_MANUAL_FIX \n        ${decl} ${varName} = null; // Swal prompt needs manual async/then wiring for ${msg}`;
        });

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log('Refactored confirm/prompt in', filePath);
        }
    }
});
