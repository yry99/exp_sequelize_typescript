// src/middleware/roleMiddleware.ts
import { Request, Response, NextFunction } from 'express';

export const authorize = (roles: Array<'admin' | 'customer'>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized: No user information' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: You do not have access to this resource' });
    }

    next();
  };
};
