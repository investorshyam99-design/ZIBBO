const fs = require('fs');
let code = fs.readFileSync('src/components/CartDrawer.tsx', 'utf8');

if (!code.includes('useEffect')) {
  code = code.replace(
    "import React from 'react';",
    "import React, { useEffect } from 'react';"
  );
}

code = code.replace(
  "const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);",
  "const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);\n\n  useEffect(() => {\n    if (isCartDrawerOpen) {\n      document.body.style.overflow = 'hidden';\n    } else {\n      document.body.style.overflow = '';\n    }\n    return () => {\n      document.body.style.overflow = '';\n    };\n  }, [isCartDrawerOpen]);\n"
);

fs.writeFileSync('src/components/CartDrawer.tsx', code);
