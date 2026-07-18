const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(
  "import { products, categories } from './src/data.ts';",
  "// No local products for sitemap"
);

code = code.replace(
  "products.forEach(p => {",
  "/* products.forEach(p => {"
);

code = code.replace(
  "categories.forEach(c => {",
  "}); */\n    /* categories.forEach(c => {"
);

code = code.replace(
  "xml += `</urlset>`;",
  "}); */\n    xml += `</urlset>`;"
);

fs.writeFileSync('server.ts', code);
