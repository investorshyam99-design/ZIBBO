const fs = require('fs');
let code = fs.readFileSync('src/views/HomeView.tsx', 'utf8');

code = code.replace(
  "import ShopTheLook from '../components/ShopTheLook';",
  "import AutoScrollingBanner from '../components/AutoScrollingBanner';"
);

code = code.replace(
  "<ShopTheLook />",
  "<AutoScrollingBanner />"
);

fs.writeFileSync('src/views/HomeView.tsx', code);
