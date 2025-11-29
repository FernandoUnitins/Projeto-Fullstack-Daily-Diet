import { v4 as uuid } from 'uuid';
import { db } from '../database.js';

// Função auxiliar para formatar o resultado do banco para o Frontend
// O SQLite retorna 0 ou 1 para booleanos, então convertemos com Boolean()
const formatMeal = m => ({
  id: m.id,
  userId: m.user_id,
  name: m.name,
  description: m.description,
  dateTime: m.date_time,
  onDiet: Boolean(m.on_diet),
});

export async function listMeals(req, res) {
  // ATENÇÃO: Use o ID vindo do middleware checkUserId (que sugeri anteriormente)
  // ou use req.query.userId temporariamente se ainda não criou o middleware
  const userId = req.user?.id || req.query.userId;

  if (!userId) return res.status(400).json({ error: 'userId required' });

  const meals = await db('meals')
    .where({ user_id: userId })
    .orderBy('date_time', 'desc');

  return res.json(meals.map(formatMeal));
}

export async function createMeal(req, res) {
  const userId = req.user?.id || req.body.userId;
  const { name, description, dateTime, onDiet } = req.body;

  if (!userId || !name || !dateTime || typeof onDiet !== 'boolean') {
    return res.status(400).json({ error: 'Dados inválidos' });
  }

  const meal = {
    id: uuid(),
    user_id: userId,
    name,
    description: description || '',
    date_time: new Date(dateTime).toISOString(),
    on_diet: onDiet, // Mapeando para snake_case do banco
  };

  await db('meals').insert(meal);

  return res.status(201).json(formatMeal(meal));
}

export async function getMeal(req, res) {
  const { mealId } = req.params;
  const meal = await db('meals').where({ id: mealId }).first();

  if (!meal) return res.status(404).json({ error: 'Refeição não encontrada' });

  return res.json(formatMeal(meal));
}

export async function updateMeal(req, res) {
  const { mealId } = req.params;
  const { name, description, dateTime, onDiet } = req.body;

  const meal = await db('meals').where({ id: mealId }).first();
  if (!meal) return res.status(404).json({ error: 'Refeição não encontrada' });

  const updates = {};
  if (name !== undefined) updates.name = name;
  if (description !== undefined) updates.description = description;
  if (dateTime !== undefined)
    updates.date_time = new Date(dateTime).toISOString();
  if (onDiet !== undefined) updates.on_diet = onDiet;

  await db('meals').where({ id: mealId }).update(updates);

  return res.json({ success: true });
}

export async function deleteMeal(req, res) {
  const { mealId } = req.params;
  const count = await db('meals').where({ id: mealId }).delete();

  if (count === 0)
    return res.status(404).json({ error: 'Refeição não encontrada' });

  return res.status(204).send();
}

export async function getMetrics(req, res) {
  const userId = req.user?.id || req.query.userId;
  if (!userId) return res.status(400).json({ error: 'userId required' });

  // Busca todas as refeições do usuário ordenadas por data
  const userMeals = await db('meals')
    .where({ user_id: userId })
    .orderBy('date_time', 'asc');

  const total = userMeals.length;
  // O filtro deve considerar que no SQLite o true volta como 1
  const onDiet = userMeals.filter(m => Boolean(m.on_diet)).length;
  const offDiet = total - onDiet;

  let bestStreak = 0;
  let current = 0;

  for (const m of userMeals) {
    if (Boolean(m.on_diet)) {
      current++;
      if (current > bestStreak) bestStreak = current;
    } else {
      current = 0;
    }
  }

  return res.json({ total, onDiet, offDiet, bestStreak });
}

/*
import { v4 as uuid } from 'uuid';

let meals = [];

export function listMeals(req, res) {
  const { userId } = req.query; // pega userId da query
  if (!userId) return res.status(400).json({ error: 'userId required' });

  const userMeals = meals
    .filter(m => m.userId === userId)
    .sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
  return res.json(userMeals);
}

export function createMeal(req, res) {
  const { userId } = req.body; // agora vem no corpo da requisição
  const { name, description, dateTime, onDiet } = req.body;

  if (!userId || !name || !dateTime || typeof onDiet !== 'boolean') {
    return res
      .status(400)
      .json({ error: 'userId, name, dateTime and onDiet(boolean) required' });
  }

  const meal = {
    id: uuid(),
    userId,
    name,
    description: description || '',
    dateTime: new Date(dateTime).toISOString(),
    onDiet,
    createdAt: new Date().toISOString(),
  };

  meals.push(meal);
  return res.status(201).json(meal);
}

export function getMeal(req, res) {
  const { mealId } = req.params;
  const meal = meals.find(m => m.id === mealId);
  if (!meal) return res.status(404).json({ error: 'Meal not found' });
  return res.json(meal);
}

export function updateMeal(req, res) {
  const { mealId } = req.params;
  const index = meals.findIndex(m => m.id === mealId);
  if (index === -1) return res.status(404).json({ error: 'Meal not found' });

  const { name, description, dateTime, onDiet } = req.body;
  meals[index] = {
    ...meals[index],
    name: name ?? meals[index].name,
    description: description ?? meals[index].description,
    dateTime: dateTime
      ? new Date(dateTime).toISOString()
      : meals[index].dateTime,
    onDiet: typeof onDiet === 'boolean' ? onDiet : meals[index].onDiet,
  };

  return res.json(meals[index]);
}

export function deleteMeal(req, res) {
  const { mealId } = req.params;
  const before = meals.length;
  meals = meals.filter(m => m.id !== mealId);
  if (meals.length === before)
    return res.status(404).json({ error: 'Meal not found' });
  return res.status(204).send();
}

// --- Métricas ---
export function getMetrics(req, res) {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: 'userId required' });

  const userMeals = meals
    .filter(m => m.userId === userId)
    .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));

  const total = userMeals.length;
  const onDiet = userMeals.filter(m => m.onDiet).length;
  const offDiet = total - onDiet;

  let bestStreak = 0,
    current = 0;
  for (const m of userMeals) {
    if (m.onDiet) {
      current++;
      if (current > bestStreak) bestStreak = current;
    } else {
      current = 0;
    }
  }

  return res.json({ total, onDiet, offDiet, bestStreak });
}
*/
