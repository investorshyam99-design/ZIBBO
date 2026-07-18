const fs = require('fs');
let code = fs.readFileSync('src/components/AutoScrollingBanner.tsx', 'utf8');

code = code.replace(
  "scrollerRef.current.style.transform = \\`translate3d(\\${x.current}px, 0, 0)\\`;",
  "scrollerRef.current.style.transform = `translate3d(${x.current}px, 0, 0)`;"
);

// also fix the other template literals if any
code = code.replace(
  "key={\\`\\${product.id}-\\${idx}\\`}",
  "key={`${product.id}-${idx}`}"
);

fs.writeFileSync('src/components/AutoScrollingBanner.tsx', code);
