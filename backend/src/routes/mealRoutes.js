import { Router } from 'express';
import {
  listMeals,
  createMeal,
  getMeal,
  updateMeal,
  deleteMeal,
  getMetrics,
} from '../controllers/mealController.js';

// 1. Importe o middleware
import { checkUserId } from '../middlewares/checkUserId.js';

const router = Router();

// 2. Aplique o middleware em TODAS as rotas deste arquivo
router.use(checkUserId);

// As rotas continuam as mesmas, mas agora estão protegidas
router.get('/metrics', getMetrics);
router.get('/', listMeals);
router.post('/', createMeal);
router.get('/:mealId', getMeal);
router.put('/:mealId', updateMeal);
router.delete('/:mealId', deleteMeal);

export default router;

/*
import { Router } from 'express';
import {
  listMeals,
  createMeal,
  getMeal,
  updateMeal,
  deleteMeal,
  getMetrics,
} from '../controllers/mealController.js';

const router = Router();

router.get('/metrics', getMetrics);

router.get('/', listMeals); // GET /meals?userId=xxx
router.post('/', createMeal); // POST /meals
router.get('/:mealId', getMeal); // GET /meals/:mealId
router.put('/:mealId', updateMeal); // PUT /meals/:mealId
router.delete('/:mealId', deleteMeal); // DELETE /meals/:mealId

export default router;
*/
