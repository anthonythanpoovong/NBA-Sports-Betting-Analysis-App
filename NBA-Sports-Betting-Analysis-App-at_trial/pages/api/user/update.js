import bcrypt from 'bcryptjs';
import { connectToDatabase } from '../../../src/components/lib/mangodb'; // Adjust the import path if necessary

export default async function handler(req, res) {
  if (req.method === 'POST') { // Ensure this matches the method used
    const { email, firstName, lastName, oldPassword, newPassword } = req.body;

    // Validate the request body
    if (!email || (!firstName && !lastName && !newPassword && !oldPassword)) {
      return res.status(400).json({ message: 'Email and at least one field to update are required' });
    }

    try {
      const { db } = await connectToDatabase();
      const user = await db.collection('users').findOne({ email });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Check old password if new password is provided
      if (newPassword && oldPassword) {
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
          return res.status(400).json({ message: 'Old password is incorrect' });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        user.password = hashedPassword;
      }

      // Prepare the update data
      const updateData = {};
      if (firstName) updateData.firstName = firstName;
      if (lastName) updateData.lastName = lastName;
      if (newPassword) updateData.password = user.password; // Set updated password

      // Update the user in the database
      await db.collection('users').updateOne({ email }, { $set: updateData });

      return res.status(200).json({ message: 'User updated successfully' });
    } catch (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'An internal server error occurred' });
    }
  } else {
    res.setHeader('Allow', ['POST']); // Ensure this matches the method used
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
