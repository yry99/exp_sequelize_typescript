// src/server.ts
import express, { Application } from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import { initModels } from './models';
import cors from 'cors';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Root Endpoint
app.get('/', (req, res) => {
  res.send('RBAC REST API is running');
});

// Initialize Models and Start Server
const startServer = async () => {
  try {
    await initModels();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
};

startServer();
