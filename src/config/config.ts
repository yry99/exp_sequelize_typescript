// src/config/config.ts
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DATABASE_NAME || 'rest_express',
  process.env.DATABASE_USER || 'postgres',
  process.env.DATABASE_PASSWORD || '',
  {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432'),
    dialect: 'postgres',
    logging: false, // Disable logging; enable if needed
  }
);

export default sequelize;
