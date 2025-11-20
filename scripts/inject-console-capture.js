const fs = require('fs');
const path = require('path');

const BUILD_DIR = path.join(process.cwd(), '.next');
const SCRIPT_TAG = '<script src="/dashboard-console-capture.js"></script>';

function injectScript(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    if (content.includes(SCRIPT_TAG)) {
      return;
    }
    
    content = content.replace('</head>', `${SCRIPT_TAG}</head>`);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Injected console capture script into ${filePath}`);
  } catch (error) {
    console.error(`✗ Error injecting script into ${filePath}:`, error.message);
  }
}

function findHTMLFiles(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findHTMLFiles(filePath);
    } else if (file.endsWith('.html')) {
      injectScript(filePath);
    }
  });
}

if (fs.existsSync(BUILD_DIR)) {
  console.log('Starting console capture script injection...');
  findHTMLFiles(BUILD_DIR);
  console.log('Console capture script injection complete!');
} else {
  console.warn('Build directory not found. Run build first.');
}