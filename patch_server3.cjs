const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');
code = code.replace("let xml = \\`<?xml", "let xml = `<?xml");
code = code.replace("</urlset>\\`;", "</urlset>`;");
code = code.replace("console.log(\\`Server", "console.log(`Server");
code = code.replace("\\${PORT}\\`);", "${PORT}`);");
fs.writeFileSync('server.ts', code);
