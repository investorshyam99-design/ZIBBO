const fs = require('fs');
let code = fs.readFileSync('src/AppContext.tsx', 'utf8');

const oldQueryBlock = `        const query = \`
          {
            products(first: 50) {
              edges {
                node {
                  id
                  title
                  handle
                  images(first: 5) {
                    edges {
                      node {
                        url
                      }
                    }
                  }
                  priceRange {
                    minVariantPrice {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        \`;`;

const newQueryBlock = `        const query = \`
          {
            products(first: 50) {
              edges {
                node {
                  id
                  title
                  handle
                  descriptionHtml
                  collections(first: 5) {
                    edges {
                      node {
                        title
                      }
                    }
                  }
                  variants(first: 5) {
                    edges {
                      node {
                        id
                        title
                        price {
                          amount
                        }
                      }
                    }
                  }
                  media(first: 5) {
                    edges {
                      node {
                        ... on MediaImage {
                          image {
                            url
                          }
                        }
                        ... on Video {
                          sources {
                            url
                            mimeType
                          }
                        }
                      }
                    }
                  }
                  images(first: 5) {
                    edges {
                      node {
                        url
                      }
                    }
                  }
                  priceRange {
                    minVariantPrice {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        \`;`;

const oldMapBlock = `        const badges = ['🔥 Trending', '⭐ Best Seller', '⚡ Must Have', '⏳ Limited Stock', '❤️ Customer Favourite', '🚀 Selling Fast', '✨ New Arrival'];
        const formattedProducts = json.data.products.edges.map(({ node }: any) => {
          const shopifyPrice = parseFloat(node.priceRange.minVariantPrice.amount);
          const originalPrice = shopifyPrice > 0 ? (shopifyPrice * 2) + 1 : 0;
          
          // Truly random badge per page load
          const randomBadgeIndex = Math.floor(Math.random() * badges.length);
          return {
            id: String(node.id).split('/').pop() || String(node.id),
            name: node.title,
            price: shopifyPrice,
            originalPrice: originalPrice,
            image: node.images.edges[0]?.node.url || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000',
            images: node.images.edges.map((e: any) => e.node.url),
            category: node.productType || 'Product',
            rating: parseFloat((Math.random() * (4.9 - 4.0) + 4.0).toFixed(1)),
            reviews: Math.floor(Math.random() * (199 - 50 + 1)) + 50,
            description: 'Premium quality product meticulously designed for your everyday needs.',
            badges: [badges[randomBadgeIndex]],
            isNew: Math.random() > 0.5,
            stock: 999
          };
        });`;

const newMapBlock = `        const badges = ['🔥 Trending', '⭐ Best Seller', '⚡ Must Have', '⏳ Limited Stock', '❤️ Customer Favourite', '🚀 Selling Fast', '✨ New Arrival'];
        const formattedProducts = json.data.products.edges.map(({ node }: any) => {
          const shopifyPrice = parseFloat(node.priceRange.minVariantPrice.amount);
          const originalPrice = shopifyPrice > 0 ? (shopifyPrice * 1.5).toFixed(0) : 0;
          
          const collections = node.collections?.edges.map((e: any) => e.node.title) || [];
          const variants = node.variants?.edges.map((e: any) => e.node) || [];
          
          let videoUrl = '';
          const media = node.media?.edges || [];
          for (const m of media) {
            if (m.node.sources) {
              const mp4 = m.node.sources.find((s: any) => s.mimeType === 'video/mp4');
              if (mp4) {
                videoUrl = mp4.url;
                break;
              }
            }
          }

          // Truly random badge per page load
          const randomBadgeIndex = Math.floor(Math.random() * badges.length);
          return {
            id: String(node.id).split('/').pop() || String(node.id),
            name: node.title,
            price: shopifyPrice,
            originalPrice: Number(originalPrice),
            image: node.images.edges[0]?.node.url || '',
            images: node.images.edges.map((e: any) => e.node.url),
            category: collections.length > 0 ? collections[0] : (node.productType || 'Product'),
            rating: parseFloat((Math.random() * (4.9 - 4.0) + 4.0).toFixed(1)),
            reviews: Math.floor(Math.random() * (199 - 50 + 1)) + 50,
            description: node.descriptionHtml || 'Premium quality product meticulously designed for your everyday needs.',
            video: videoUrl,
            collections: collections,
            variants: variants,
            badges: [badges[randomBadgeIndex]],
            isNew: Math.random() > 0.5,
            stock: 999
          };
        });`;

code = code.replace(oldQueryBlock, newQueryBlock);
code = code.replace(oldMapBlock, newMapBlock);

fs.writeFileSync('src/AppContext.tsx', code);
