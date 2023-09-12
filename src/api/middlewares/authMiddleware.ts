// Create a middleware function to verify JWT tokens
import { verifyTokens } from '@/utils/tokens';
import jwt from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';

// Your JWT secret key (should be kept secret and not hard-coded)
const JWT_SECRET = 'test';

// Extend the NextApiRequest interface to include a 'user' property
declare module 'next' {
  interface NextApiRequest {
    user?: any; // Replace 'any' with the actual type of your user object
  }
}
export const authenticateJWT = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: (error?: any) => void
) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // verify tokens
  //   const tokens = verifyTokens(token);
  //   if (tokens) {
  // // do something
  //   }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    console.log('Admin create', token, err?.message, user);
    if (err) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    // TODO set admin
    req.user = user;
    next();
  });
};
