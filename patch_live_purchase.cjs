const fs = require('fs');
let code = fs.readFileSync('src/components/LivePurchasePopup.tsx', 'utf8');

code = code.replace(
  "const { currentView, selectedProductObj, products } = useAppContext();",
  "const { currentView, selectedProductObj, products, isCartDrawerOpen } = useAppContext();"
);

code = code.replace(
  "return (",
  "if (isCartDrawerOpen || currentView === 'cart' || currentView === 'checkout') return null;\n\n  return ("
);

fs.writeFileSync('src/components/LivePurchasePopup.tsx', code);
