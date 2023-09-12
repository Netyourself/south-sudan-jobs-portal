// pages/api/users.ts

import { NextApiRequest, NextApiResponse } from 'next';
import jwt, { JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { usersData } from '@/data/data';
import { User, UserAPI } from '@/types/user';
import { generateToken } from '@/utils/tokens';
import { hashPassword } from '@/utils/hashing';

// Define a custom JWT payload type that includes the 'role' property
interface CustomJwtPayload extends JwtPayload {
  role: string;
}
///const usersData: any[] = data;
const secretKey = 'your-secret-key'; // Replace with your secret key

// User Action route
const userAction = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST' && req.body.action === 'signup') {
    try {
      const {
        firstName,
        lastName,
        email,
        organization,
        role,
        //createdBy,
        password,
      } = req.body;

      // Hash the user's password before saving it
      const hashedPassword = await hashPassword(password);

      let status = 'pending'; // Default status
      let createdBy = req.body.createdBy; // get id if availble
      // Check if an authenticated token with the role of "admin" is provided
      const token = req.headers.authorization?.replace('Bearer ', '');
      console.log('SIGNUP>>', token, TokenExpiredError);
      if (token && !TokenExpiredError) {
        // TODO check for expired tokens as well !TokenExpiredError
        //const decodedToken = jwt.verify(token, secretKey);
        // Now you can use the CustomJwtPayload type to access the 'role' property
        const decodedToken: CustomJwtPayload = jwt.verify(
          token,
          secretKey
        ) as CustomJwtPayload;
        if (decodedToken.role === 'admin') {
          // Set the status to "active" for admin role when created by an admin user
          status = 'active';
          createdBy = decodedToken.userid; // update it with tokens userid
        }
      }
      // TODO fix status
      status = 'active';

      const newUser: UserAPI = {
        userId: uuid(),
        password: hashedPassword,
        firstName,
        lastName,
        email,
        role,
        status,
        organization,
        createdAt: new Date(),
        createdBy, // or get the id from the token if any
      };
      usersData.push(newUser); // TODO fix

      // Generate a token for the new user
      const generatedToken = generateToken(newUser);

      res.status(201).json({ user: newUser, token: generatedToken });
    } catch (error) {
      console.error('Error signing up:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'POST' && req.body.action === 'signin') {
    try {
      const { email, password } = req.body;
      const user = usersData.find((u) => u.email === email);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Check if the user's status is "active"
      if (user.status !== 'active') {
        return res.status(401).json({ error: 'Account not yet active' });
      }

      // Compare the provided password with the stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      // Generate a token for the signed-in user
      const generatedToken = generateToken(user);

      res.status(200).json({ user, token: generatedToken });
    } catch (error) {
      console.error('Error signing in:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default userAction;
