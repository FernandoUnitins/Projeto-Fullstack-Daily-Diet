import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import mealRoutes from './routes/mealRoutes.js';

const app = express();

app.use(express.json());

app.use(cors());

app.use('/users', userRoutes);
app.use('/meals', mealRoutes);

app.listen(3333, () => {
  console.log('🔥 Server running on http://localhost:3333');
});
