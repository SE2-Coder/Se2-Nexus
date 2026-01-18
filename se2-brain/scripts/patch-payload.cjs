const fs = require('fs');
const path = require('path');
const { fileURLToPath } = require('url');

// Handle ESM dirname if needed, but this script is run via node in CJS or ESM context
// For simplicity in postinstall, we use __dirname if available or current path
const targetFile = path.join(process.cwd(), 'node_modules/@payloadcms/next/dist/views/Root/index.js');

console.log('--- Payload Patch Script Starting ---');
console.log('Target:', targetFile);

if (fs.existsSync(targetFile)) {
    let content = fs.readFileSync(targetFile, 'utf8');

    // Patterns to look for:
    // 1. { importMap, key: 'initPage' }
    // 2. { importMap: importMap, key: 'initPage' }
    // 3. { importMap: e, key: 'initPage' } (minified)

    const possiblePatterns = [
        /importMap\s*,\s*key\s*:\s*['"]initPage['"]/g,
        /importMap\s*:\s*[^,}]+\s*,\s*key\s*:\s*['"]initPage['"]/g
    ];

    let patched = content;
    let found = false;

    for (const pattern of possiblePatterns) {
        if (pattern.test(content)) {
            console.log('Found patch target with pattern:', pattern);
            patched = patched.replace(pattern, (match) => {
                // Keep the key: 'initPage' part, but force importMap to {}
                return match.replace(/importMap(\s*:\s*[^,]+)?/, "importMap: {}");
            });
            found = true;
        }
    }

    if (found && content !== patched) {
        fs.writeFileSync(targetFile, patched, 'utf8');
        console.log('✅ SUCCESSFULLY PATCHED: @payloadcms/next/dist/views/Root/index.js');
    } else {
        console.log('⚠️ Could not find specific pattern to patch.');
        // Debug: Log the vicinity of 'initPage' to see what the minifier did
        const index = content.indexOf('initPage');
        if (index !== -1) {
            console.log('Code snippet found around initPage:');
            console.log(content.substring(Math.max(0, index - 100), Math.min(content.length, index + 100)));
        } else {
            console.log('❌ Could not even find "initPage" in the file!');
        }
    }
} else {
    console.log('⚠️ Target file not found for patching.');
}
