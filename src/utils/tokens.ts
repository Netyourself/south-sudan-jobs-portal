import jwt, { JwtPayload, TokenExpiredError } from 'jsonwebtoken';

const secretKey = 'test'; // secret key from env

// Function to generate a JWT token
export const generateToken = (user: any) => {
  return jwt.sign({ userid: user.userId, role: user.role }, secretKey, {
    expiresIn: '1h',
  });
};

// Verify tokens

export const verifyTokens = (tokenString: string) => {
  try {
    const token = tokenString?.replace('Bearer ', '');

    const decodedToken = jwt.verify(token, secretKey);
    return decodedToken;
  } catch (error) {
    console.log('ERROR');
  }
};
