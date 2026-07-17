const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace("import express from 'express';", "import express from 'express';\nimport Razorpay from 'razorpay';\nimport crypto from 'crypto';\nimport dotenv from 'dotenv';\ndotenv.config();");

code = code.replace("const app = express();", "const app = express();\n  app.use(express.json());");

const razorpayRoute = `
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
`;

code = code.replace("// API route for health", razorpayRoute + "\n\n  // API route for health");

fs.writeFileSync('server.ts', code);
