const fs = require('fs');
let code = fs.readFileSync('src/components/CustomerFavorites.tsx', 'utf8');

code = code.replace(
  /<button className="w-full bg-brand-navy text-white py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-brand-navy\/90 transition-colors">\s*Buy Now\s*<\/button>/g,
  ""
);

fs.writeFileSync('src/components/CustomerFavorites.tsx', code);
