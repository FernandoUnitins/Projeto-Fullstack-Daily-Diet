
import { Router } from 'express';
import userRoutes from './userRoutes.js';
import mealRoutes from './mealRoutes.js';

const routes = Router();
routes.use('/users', userRoutes);
routes.use('/meals', mealRoutes);

export default routes;
