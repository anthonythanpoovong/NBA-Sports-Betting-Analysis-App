import bcrypt from 'bcryptjs';
import multer from 'multer';
import { connectToDatabase } from '../../../src/components/lib/mangodb'; // Adjust the import path if necessary

const upload = multer({ dest: 'uploads/' }); // Directory where images will be stored

export const config = {
  api: {
    bodyParser: false, // Disable body parsing so we can handle it with multer
  },
};

// Handler function for updating user profile
const handler = async (req, res) => {
  if (req.method === 'POST') {
    upload.single('profilePicture')(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error uploading file' });
      }

      const { email, firstName, lastName, oldPassword, newPassword } = req.body;

      // Validate the request body
      if (!email || (!firstName && !lastName && !newPassword && !oldPassword && !req.file)) {
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
        if (req.file) updateData.profilePicture = req.file.path; // Save the file path

        // Update the user in the database
        await db.collection('users').updateOne({ email }, { $set: updateData });

        return res.status(200).json({ message: 'User updated successfully' });
      } catch (err) {
        console.error('Database error:', err);
        return res.status(500).json({ message: 'An internal server error occurred' });
      }
    });
  } else {
    res.setHeader('Allow', ['POST']); // Ensure this matches the method used
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
