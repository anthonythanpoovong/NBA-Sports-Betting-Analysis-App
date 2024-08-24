import bcrypt from 'bcryptjs';
import { connectToDatabase } from '../../src/components/lib/mangodb'; // Adjust the import path if necessary

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { firstName, lastName, email, password } = req.body;
    console.log(req.body);

    // Validate the request body
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'First name, last name, email, and password are required' });
    }

    try {
      const { db } = await connectToDatabase();
      const existingUser = await db.collection('users').findOne({ email });

      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      await db.collection('users').insertOne({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

      return res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      console.error('Database error:', err); // Log the error to the server console
      return res.status(500).json({ message: 'An internal server error occurred' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
