// src/models/index.ts
import sequelize from '../config/config';
import User from './user';

const initModels = async () => {
  await sequelize.sync({ alter: true }); // Use { force: true } to drop tables and recreate them
  console.log('All models were synchronized successfully.');
};

export { sequelize, User, initModels };
