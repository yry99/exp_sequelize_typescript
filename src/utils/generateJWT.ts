// src/utils/generateJWT.ts
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface TokenPayload {
  userId: number;
  role: string;
}

export const generateJWT = (payload: TokenPayload): string => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: process.env.JWT_EXPIRES_IN });
};
