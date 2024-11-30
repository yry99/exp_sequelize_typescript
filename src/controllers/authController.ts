// src/controllers/authController.ts
import { Request, Response } from 'express';
import { User } from '../models';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Generate JWT Token
const generateToken = (id: number, role: 'admin' | 'customer') => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
};

// Register a new customer
export const registerUser = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ message: 'Email, username, and password are required' });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    const user = await User.create({ email, username, password, role: 'customer' });
    const token = generateToken(user.id, user.role);
    return res.status(201).json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error during user registration' });
  }
};

// Register a new admin
export const registerAdmin = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Admins might not have an email
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const existingAdmin = await User.findOne({ where: { username } });
    if (existingAdmin) {
      return res.status(409).json({ message: 'Username already in use' });
    }

    const admin = await User.create({ username, password, role: 'admin' });
    const token = generateToken(admin.id, admin.role);
    return res.status(201).json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error during admin registration' });
  }
};

// Login as customer using email and password
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ where: { email, role: 'customer' } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = user.validPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user.id, user.role);
    return res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error during user login' });
  }
};

// Login as admin using username and password
export const loginAdmin = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const admin = await User.findOne({ where: { username, role: 'admin' } });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = admin.validPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(admin.id, admin.role);
    return res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error during admin login' });
  }
};
