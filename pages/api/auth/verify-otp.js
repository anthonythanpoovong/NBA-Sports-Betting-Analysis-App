// /api/auth/verify-otp.js
import { connectToDatabase } from '../../../src/components/lib/mangodb';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.status(400).json({ message: 'Email, OTP, and new password are required' });
  }

  try {
    const { db } = await connectToDatabase();
    const user = await db.collection('users').findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Check if OTP matches
    if (user.otp !== parseInt(otp)) {
      return res.status(401).json({ message: 'Invalid OTP' });
    }

    // Check if OTP has expired
    if (Date.now() > user.otpExpires) {
      return res.status(401).json({ message: 'OTP has expired' });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user's password and clear OTP fields
    await db.collection('users').updateOne(
      { email },
      { 
        $set: { password: hashedPassword },
        $unset: { otp: "", otpExpires: "" }
      }
    );

    return res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error in verify-otp:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}
