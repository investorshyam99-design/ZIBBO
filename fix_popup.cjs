const fs = require('fs');
let code = fs.readFileSync('src/components/LivePurchasePopup.tsx', 'utf8');

code = code.replace(
  'interval = setInterval(() => {\n        showNotification();\n      }, 30000);',
  'interval = setInterval(() => {\n        showNotification();\n      }, 40000);'
);

code = code.replace(
  'hideTimeout = setTimeout(() => {\n          setIsVisible(false);\n        }, 5000);',
  'hideTimeout = setTimeout(() => {\n          setIsVisible(false);\n        }, 3000);'
);

fs.writeFileSync('src/components/LivePurchasePopup.tsx', code);
