const fs = require('fs');
let code = fs.readFileSync('src/AppContext.tsx', 'utf8');

code = code.replace(
  "import { products as defaultProducts } from './data';",
  ""
);

code = code.replace(
  "const [products, setProducts] = useState<Product[]>(defaultProducts);",
  "const [products, setProducts] = useState<Product[]>([]);"
);

fs.writeFileSync('src/AppContext.tsx', code);
