import type { VercelRequest, VercelResponse } from '@vercel/node';
import Razorpay from 'razorpay';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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
}
