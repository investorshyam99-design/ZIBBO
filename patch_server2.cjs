const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

// I will just remove the whole sitemap generation for now to simplify
const match = code.match(/app\.get\('\/sitemap\.xml'.*?}\);/s);
if (match) {
  code = code.replace(match[0], `app.get('/sitemap.xml', (req, res) => {
    let xml = \`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://zibbo.in/</loc>
    <priority>1.0</priority>
  </url>
</urlset>\`;
    res.header('Content-Type', 'application/xml');
    res.send(xml);
  });`);
} else {
  // If we couldn't match it perfectly, we just rewrite the whole file
}

fs.writeFileSync('server.ts', code);
