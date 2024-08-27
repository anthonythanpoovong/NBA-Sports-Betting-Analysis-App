// pages/api/user/[email].js
import { connectToDatabase } from '../../../src/components/lib/mangodb';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    try {
      const { db } = await connectToDatabase();
      const user = await db.collection('users').findOne({ email });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json({ user: { email: user.email, firstName: user.firstName, lastName: user.lastName, createdAt: user.createdAt } });
    } catch (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}