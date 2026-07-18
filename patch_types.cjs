const fs = require('fs');
let code = fs.readFileSync('src/types.ts', 'utf8');

code = code.replace(
  "export interface Product {",
  "export interface Product {\n  description?: string;\n  video?: string;\n  collections?: string[];\n  variants?: any[];"
);

fs.writeFileSync('src/types.ts', code);
