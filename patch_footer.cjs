const fs = require('fs');
let code = fs.readFileSync('src/components/Footer.tsx', 'utf8');

if (!code.includes('useAppContext')) {
  code = code.replace(
    "import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react';",
    "import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react';\nimport { useAppContext } from '../AppContext';"
  );
}

code = code.replace(
  "export default function Footer() {",
  "export default function Footer() {\n  const { currentView } = useAppContext();\n  if (currentView === 'cart' || currentView === 'checkout') return null;"
);

fs.writeFileSync('src/components/Footer.tsx', code);
