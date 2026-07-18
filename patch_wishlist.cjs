const fs = require('fs');
let code = fs.readFileSync('src/AppContext.tsx', 'utf8');

code = code.replace(
  /\/\/ Wishlist Listener[\s\S]*?}, \[user\]\);/m,
  ""
);

fs.writeFileSync('src/AppContext.tsx', code);
