const fs = require('fs');
let code = fs.readFileSync('src/AppContext.tsx', 'utf8');

if (!code.includes("import { products as defaultProducts }")) {
  code = code.replace(
    "import { Product } from './types';",
    "import { Product } from './types';\nimport { products as defaultProducts } from './data';"
  );
}

code = code.replace(
  "const [products, setProducts] = useState<Product[]>([]);",
  "const [products, setProducts] = useState<Product[]>(defaultProducts);"
);

fs.writeFileSync('src/AppContext.tsx', code);
