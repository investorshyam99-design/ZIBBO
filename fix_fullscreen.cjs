const fs = require('fs');
let code = fs.readFileSync('src/views/ProductView.tsx', 'utf8');

const regex = /<img src=\{productImages\[mainImageIndex\]\} alt=\{product\.name\} className="max-w-full max-h-full object-contain" \/>/;

const replacement = `{productImages[mainImageIndex].toLowerCase().includes('.mp4') || productImages[mainImageIndex].toLowerCase().includes('streamable') ? (
                    <video src={productImages[mainImageIndex]} autoPlay loop playsInline controls className="max-w-full max-h-full object-contain" />
                  ) : (
                    <img src={productImages[mainImageIndex]} alt={product.name} className="max-w-full max-h-full object-contain" />
                  )}`;

if(regex.test(code)) {
    code = code.replace(regex, replacement);
    fs.writeFileSync('src/views/ProductView.tsx', code);
    console.log("Success fullscreen");
} else {
    console.log("Regex didn't match fullscreen");
}
