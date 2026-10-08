const fs = require('fs');
const path = require('path');

function replaceConfirmWithSwal(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    let i = 0;
    while (true) {
        let match = content.substring(i).match(/if\s*\(\s*confirm\s*\(\s*(`[^`]*`|'[^']*'|"[^"]*")\s*\)\s*\)\s*\{/);
        if (!match) break;
        
        let startIdx = i + match.index;
        let blockStartIdx = startIdx + match[0].length;
        
        let braceCount = 1;
        let blockEndIdx = blockStartIdx;
        let inString = false;
        let stringChar = '';
        
        for (; blockEndIdx < content.length; blockEndIdx++) {
            let char = content[blockEndIdx];
            
            // Handle strings to avoid counting braces inside strings
            if ((char === "'" || char === '"' || char === '`') && content[blockEndIdx-1] !== '\\') {
                if (!inString) {
                    inString = true;
                    stringChar = char;
                } else if (char === stringChar) {
                    inString = false;
                }
            }
            
            if (!inString) {
                if (char === '{') braceCount++;
                if (char === '}') braceCount--;
                if (braceCount === 0) break;
            }
        }
        
        let msg = match[1];
        let innerBlock = content.substring(blockStartIdx, blockEndIdx);
        
        let replacement = `Swal.fire({
        title: 'Confirmation',
        text: ${msg},
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3b82f6',
        cancelButtonColor: '#ef4444',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.isConfirmed) {
${innerBlock}
        }
    })`;
        
        content = content.substring(0, startIdx) + replacement + content.substring(blockEndIdx + 1);
        i = startIdx + replacement.length;
    }
    
    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Fixed', filePath);
    }
}

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        if (fs.statSync(dirPath).isDirectory()) {
            if (!dirPath.includes('node_modules') && !dirPath.includes('.git') && !dirPath.includes('uploads')) {
                walkDir(dirPath, callback);
            }
        } else {
            callback(dirPath);
        }
    });
}

walkDir(__dirname, (filePath) => {
    if (filePath.endsWith('.js') && !filePath.includes('patch-') && !filePath.includes('refactor-alerts.js') && filePath !== __filename) {
        replaceConfirmWithSwal(filePath);
    }
});
