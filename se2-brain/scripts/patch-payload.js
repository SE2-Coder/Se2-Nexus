
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../node_modules/@payloadcms/next/dist/views/Root/index.js');

if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Look for the suspect pattern inside initReq call
    // Original: importMap,
    // Target: importMap: {},

    // Use a specific search to avoid replacing other occurrences if any (though unlikely in this context)
    // We target the block inside `await initReq({`

    if (content.includes('importMap,') && content.includes('key: \'initPage\',')) {
        console.log('Found vulnerable initReq call in @payloadcms/next/views/Root/index.js');

        // This simple replacement assumes standard formatting in the dist file
        const patched = content.replace(
            /importMap,\s*key: 'initPage',/g,
            "importMap: {}, key: 'initPage',"
        );

        if (content !== patched) {
            fs.writeFileSync(filePath, patched, 'utf8');
            console.log('✅ SUCCESSFULLY PATCHED: @payloadcms/next/views/Root/index.js');
            console.log('   -> initReq will now receive an empty importMap to prevent crashes.');
        } else {
            console.log('⚠️ Pattern matched but replace failed. Check regex.');
        }
    } else if (content.includes('importMap: {},')) {
        console.log('ℹ️ File is already patched.');
    } else {
        console.log('⚠️ Could not find specific pattern in @payloadcms/next/views/Root/index.js. Might vary by version.');
    }
} else {
    console.log('⚠️ Could not find file to patch: ' + filePath);
}
