// src/controllers/userController.ts
import { Request, Response } from 'express';

export const getProfile = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(400).json({ message: 'User data missing in request' });
  }

  const { id, email, username, role, createdAt, updatedAt } = req.user;

  return res.status(200).json({ id, email, username, role, createdAt, updatedAt });
};
