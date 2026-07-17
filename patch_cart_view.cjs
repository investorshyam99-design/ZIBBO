const fs = require('fs');
let code = fs.readFileSync('src/views/CartView.tsx', 'utf8');

code = code.replace(
  '<h1 className="text-xl font-medium text-black">Your Cart ({cart.length})</h1>',
  '<h1 className="text-xl font-medium text-black">Your Cart ({cart.length})</h1>\n        <button onClick={() => navigate(\'home\')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">\n          <X className="w-6 h-6 text-gray-500" />\n        </button>'
);

if (!code.includes('import { X }')) {
  code = code.replace(
    "import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';",
    "import { Minus, Plus, Trash2, ArrowRight, X } from 'lucide-react';"
  );
}

fs.writeFileSync('src/views/CartView.tsx', code);
