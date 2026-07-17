import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { products, categories } from './src/data.ts';

async function startServer() {
  const app = express();
  app.use(express.json());
  const PORT = 3000;

  // Sitemap endpoint
  app.get('/sitemap.xml', (req, res) => {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://zibbo.in/</loc>
    <priority>1.0</priority>
  </url>`;

    products.forEach(p => {
      xml += `
  <url>
    <loc>https://zibbo.in/product/${p.id}</loc>
    <priority>0.8</priority>
  </url>`;
    });

    categories.forEach(c => {
      const categorySlug = c.name.toLowerCase().replace(/ /g, '-');
      xml += `
  <url>
    <loc>https://zibbo.in/collections/${categorySlug}</loc>
    <priority>0.8</priority>
  </url>`;
    });

    xml += `
</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(xml);
  });

  
  // Razorpay order creation
  app.post('/api/create-razorpay-order', async (req, res) => {
    try {
      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID || 'rzp_live_StypktCPqE3yKw',
        key_secret: process.env.RAZORPAY_KEY_SECRET || 'RKHxt8GfWcVDcK3zzqAvTj0F'
      });

      const options = {
        amount: req.body.amount, // amount in smallest currency unit
        currency: 'INR',
        receipt: 'receipt_' + Date.now(),
      };
      
      const order = await razorpay.orders.create(options);
      res.json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create Razorpay order' });
    }
  });
  
  // Razorpay payment verification
  app.post('/api/verify-razorpay-payment', (req, res) => {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
      const secret = process.env.RAZORPAY_KEY_SECRET || 'RKHxt8GfWcVDcK3zzqAvTj0F';
      
      const generated_signature = crypto
        .createHmac('sha256', secret)
        .update(razorpay_order_id + "|" + razorpay_payment_id)
        .digest('hex');
        
      if (generated_signature === razorpay_signature) {
        res.json({ success: true, message: 'Payment verified successfully' });
      } else {
        res.status(400).json({ success: false, message: 'Invalid signature' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to verify payment' });
    }
  });


  // API route for health
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
