import express from 'express';
import dotenv from 'dotenv';

import bodyParser from 'body-parser';
import cors from 'cors';

import publicRoutes from './src/routes/public';
import apiRoutes from './src/routes/api';
import adminRoutes from './src/routes/admin';
import apiMiddleware from './src/middleware/apiTravelerAuth';
import adminMiddleware from './src/middleware/adminAuth';
import errorHandler from './src/middleware/errorHandler';

dotenv.config();
require('./src/config/sequelize');

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
    
  }),
);

app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', publicRoutes);
app.use('/api/user', apiMiddleware, apiRoutes);
app.use('/api/admin', adminMiddleware, adminRoutes);
app.use(errorHandler);

module.exports = app;
