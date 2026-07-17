const fs = require('fs');
let code = fs.readFileSync('src/AppContext.tsx', 'utf8');

code = code.replace(
  "window.scrollTo({ top: 0, behavior: 'smooth' });",
  "window.scrollTo(0, 0);"
);

fs.writeFileSync('src/AppContext.tsx', code);
