import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface JwtPayload {
  _id: string; 
  username: string;
  email: string;
}

// Function to verify the token
export const authenticateToken = (token?: string) => {
  if (!token) {
    return null; 
  }

  const secretKey = process.env.JWT_SECRET_KEY || ''; 
  try {
    const user = jwt.verify(token, secretKey) as JwtPayload; 
        
    return user; 
  } catch (err) {
    return null; 
  }
};

// Function to create a token
export const signToken = (username: string, email: string, _id: string) => {
  const payload = { username, email, _id };
  const secretKey = process.env.JWT_SECRET_KEY || '';

  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};
