const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        if (isDirectory && f !== 'node_modules' && f !== '.git' && f !== '.vscode') {
            walkDir(dirPath, callback);
        } else if (f.endsWith('.html')) {
            callback(path.join(dir, f));
        }
    });
}

walkDir(__dirname, (filePath) => {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Determine relative path to session.js
    let relativeDepth = filePath.substring(__dirname.length).split(path.sep).length - 2;
    let sessionJsPath = (relativeDepth > 0 ? '../'.repeat(relativeDepth) : '') + 'session.js?v=3';
    
    // Remove existing session.js imports to prevent duplicates
    content = content.replace(/<script src="[^"]*session\.js[^"]*"><\/script>\s*/g, '');
    
    // Inject right before </body>
    if (content.includes('</body>')) {
        content = content.replace('</body>', `    <script src="${sessionJsPath}"></script>\n</body>`);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${filePath}`);
    }
});
