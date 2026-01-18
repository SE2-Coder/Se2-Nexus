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

    // Pattern to fix: initReq({ importMap, ... }) crashing when importMap is not empty
    // We replace the importMap passed to initReq with an empty object {}
    if (content.includes('importMap') && content.includes('initPage')) {
        console.log('Found potential initReq call area in @payloadcms/next');

        // More aggressive match: find any occurrence of importMap followed by key: 'initPage' within an object/args block
        // This handles cases like: importMap,key:"initPage" or importMap:importMap,key:"initPage"
        const patched = content.replace(
            /importMap(:[ a-zA-Z]+)?,\s*key:\s*['"]initPage['"]/g,
            "importMap: {}, key: 'initPage'"
        );

        if (content !== patched) {
            fs.writeFileSync(targetFile, patched, 'utf8');
            console.log('✅ SUCCESSFULLY PATCHED: @payloadcms/next/dist/views/Root/index.js');
        } else {
            console.log('⚠️ Pattern matched but replace failed.');
        }
    } else if (content.includes('importMap: {},')) {
        console.log('ℹ️ File is already patched.');
    } else {
        console.log('⚠️ Could not find specific pattern to patch. Check file content.');
    }
} else {
    console.log('⚠️ Target file not found for patching.');
}
