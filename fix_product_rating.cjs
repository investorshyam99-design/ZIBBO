const fs = require('fs');
let code = fs.readFileSync('src/views/ProductView.tsx', 'utf8');

// Update the calculation logic in useEffect
code = code.replace(
  /setRating\(\(rng\(\) \* \(4\.9 - 4\.0\) \+ 4\.0\)\.toFixed\(1\)\);/,
  "setRating((rng() * (4.9 - 4.0) + 4.0).toFixed(1));"
);
code = code.replace(
  /setReviewCount\(Math\.floor\(rng\(\) \* \(199 - 50 \+ 1\)\) \+ 50\);/,
  "setReviewCount(Math.floor(rng() * (199 - 100 + 1)) + 100);"
);

// Insert the badge over the image
code = code.replace(
  /<img \n                 src=\{productImages\[mainImageIndex\]\} \n                 alt=\{product\.name\} \n                 className="w-full h-full object-cover cursor-pointer" \n                 onClick=\{\(\) => setIsFullScreen\(true\)\}\n              \/>/,
  `<img 
                 src={productImages[mainImageIndex]} 
                 alt={product.name} 
                 className="w-full h-full object-cover cursor-pointer" 
                 onClick={() => setIsFullScreen(true)}
              />
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm shadow-sm border border-gray-100 rounded text-brand-navy font-bold text-xs px-2 py-1 flex items-center z-10">
                {rating} <Star className="w-3 h-3 text-brand-navy fill-brand-navy ml-0.5 mr-1" /> | {reviewCount}
              </div>`
);

fs.writeFileSync('src/views/ProductView.tsx', code);
