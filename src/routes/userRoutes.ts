// src/routes/userRoutes.ts
import { Router } from 'express';
import { getProfile } from '../controllers/userController';
import { authenticate } from '../middleware/authMiddleware';
import { authorize } from '../middleware/roleMiddleware';

const router = Router();

// Example protected route
router.get('/profile', authenticate, authorize(['admin', 'customer']), getProfile);

export default router;
