// src/routes/authRoutes.ts
import { Router } from 'express';
import { registerUser, registerAdmin, loginUser, loginAdmin } from '../controllers/authController';

const router = Router();

// Registration
router.post('/register/user', registerUser);
router.post('/register/admin', registerAdmin);

// Login
router.post('/login/user', loginUser);
router.post('/login/admin', loginAdmin);

export default router;
