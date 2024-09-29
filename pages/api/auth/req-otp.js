// /api/auth/req-otp.js
import { connectToDatabase } from '../../../src/components/lib/mangodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const { db } = await connectToDatabase();
    const user = await db.collection('users').findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpires = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes

    // Update user with OTP and expiration time
    await db.collection('users').updateOne({ email }, { $set: { otp, otpExpires } });

    // Return OTP to the client
    return res.status(200).json({ otp, firstname: user.firstname || 'User'});
  } catch (error) {
    console.error('Error in request-otp:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}
