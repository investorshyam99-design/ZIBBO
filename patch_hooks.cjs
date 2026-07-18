const fs = require('fs');
let code = fs.readFileSync('src/components/AutoScrollingBanner.tsx', 'utf8');

code = code.replace(
  "  if (bannerProducts.length === 0) return null;\n\n  useAnimationFrame((t, delta) => {",
  "  useAnimationFrame((t, delta) => {\n    if (bannerProducts.length === 0) return;"
);

code = code.replace(
  "    }\n  });\n\n  return (",
  "    }\n  });\n\n  if (bannerProducts.length === 0) return null;\n\n  return ("
);

fs.writeFileSync('src/components/AutoScrollingBanner.tsx', code);
