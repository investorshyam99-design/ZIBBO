const fs = require('fs');
let code = fs.readFileSync('src/views/ProductView.tsx', 'utf8');

const regex = /<img \s*src=\{productImages\[mainImageIndex\]\}\s*alt=\{product\.name\}\s*className="w-full h-full object-cover cursor-pointer"\s*onClick=\{\(\) => setIsFullScreen\(true\)\}\s*\/>/m;

const replacement = `<img 
                 src={productImages[mainImageIndex]} 
                 alt={product.name} 
                 className="w-full h-full object-cover cursor-pointer" 
                 onClick={() => setIsFullScreen(true)}
              />
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm shadow-sm border border-gray-100 rounded text-brand-navy font-bold text-xs px-2 py-1 flex items-center z-10">
                {rating} <Star className="w-3 h-3 text-brand-navy fill-brand-navy ml-0.5 mr-1" /> | {reviewCount}
              </div>`;

if(regex.test(code)) {
    code = code.replace(regex, replacement);
    fs.writeFileSync('src/views/ProductView.tsx', code);
    console.log("Success");
} else {
    console.log("Regex didn't match");
}
