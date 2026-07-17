const fs = require('fs');
let code = fs.readFileSync('src/views/ProductView.tsx', 'utf8');

// First, we need to import useRef if not already imported
if (!code.includes('useRef')) {
  code = code.replace(/import React, \{([\s\S]*?)\} from 'react';/, "import React, { useRef, $1 } from 'react';");
}

// Add the ref for the scroll container
code = code.replace(
  'const [mainImageIndex, setMainImageIndex] = useState(0);',
  'const [mainImageIndex, setMainImageIndex] = useState(0);\n  const imageScrollRef = useRef<HTMLDivElement>(null);'
);

const oldImagesSection = /<div className="relative aspect-\[4\/5\] md:aspect-square bg-gray-50 rounded-2xl overflow-hidden shadow-sm">[\s\S]*?<AnimatePresence>/;

const newImagesSection = `<div 
              ref={imageScrollRef}
              className="relative aspect-[4/5] md:aspect-square bg-gray-50 rounded-2xl overflow-x-auto snap-x snap-mandatory scrollbar-hide flex shadow-sm"
              onScroll={(e) => {
                const scrollLeft = e.currentTarget.scrollLeft;
                const width = e.currentTarget.clientWidth;
                const index = Math.round(scrollLeft / width);
                if (index !== mainImageIndex && index >= 0 && index < productImages.length) {
                  setMainImageIndex(index);
                }
              }}
            >
              {productImages.map((media, i) => (
                <div key={i} className="w-full h-full shrink-0 snap-center relative">
                  {media.toLowerCase().includes('.mp4') || media.toLowerCase().includes('streamable') ? (
                    <video
                      src={media}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover cursor-pointer"
                      onClick={() => setIsFullScreen(true)}
                    />
                  ) : (
                    <img 
                      src={media} 
                      alt={\`\${product.name} \${i+1}\`} 
                      className="w-full h-full object-cover cursor-pointer" 
                      onClick={() => setIsFullScreen(true)}
                    />
                  )}
                  {i === 0 && (
                    <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm shadow-sm border border-gray-100 rounded text-brand-navy font-bold text-xs px-2 py-1 flex items-center z-10">
                      {rating} <Star className="w-3 h-3 text-brand-navy fill-brand-navy ml-0.5 mr-1" /> | {reviewCount}
                    </div>
                  )}
                </div>
              ))}
            </div>
            {hasMultipleImages && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x">
                {productImages.map((media, i) => (
                  <button 
                    key={i} 
                    onClick={() => {
                      setMainImageIndex(i);
                      if (imageScrollRef.current) {
                        imageScrollRef.current.scrollTo({ left: i * imageScrollRef.current.clientWidth, behavior: 'smooth' });
                      }
                    }}
                    className={\`snap-start flex-none w-20 h-20 rounded-xl overflow-hidden border-2 \${i === mainImageIndex ? 'border-brand-navy' : 'border-transparent'} transition-colors relative\`}
                  >
                    {media.toLowerCase().includes('.mp4') || media.toLowerCase().includes('streamable') ? (
                      <video src={media} className="w-full h-full object-cover" muted playsInline />
                    ) : (
                      <img src={media} alt={\`\${product.name} \${i+1}\`} className="w-full h-full object-cover" />
                    )}
                  </button>
                ))}
              </div>
            )}
            
            <AnimatePresence>`;

code = code.replace(oldImagesSection, newImagesSection);
fs.writeFileSync('src/views/ProductView.tsx', code);
console.log('Replaced images section');
