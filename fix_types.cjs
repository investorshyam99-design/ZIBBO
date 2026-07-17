const fs = require('fs');
let code = fs.readFileSync('src/types.ts', 'utf8');

if (!code.includes('images?: string[];')) {
  code = code.replace(
    '  image: string;',
    '  image: string;\n  images?: string[];'
  );
  fs.writeFileSync('src/types.ts', code);
}
