/* v1
import { v4 as uuid } from 'uuid';

let users = [];

export function createUser(req, res) {
  const { name } = req.body;
  const newUser = { id: uuid(), name };
  users.push(newUser);
  return res.status(201).json(newUser);
}
  */

/* v2

import { v4 as uuid } from 'uuid';
import { db } from '../database.js'; // Importa a conexão

export async function createUser(req, res) {
  const { name, email } = req.body;

  const newUser = {
    id: uuid(),
    name,
    email: email || '',
  };

  // Insere no banco SQLite
  await db('users').insert(newUser);

  return res.status(201).json(newUser);
}

// ... (imports e createUser continuam iguais)

export async function getUserProfile(req, res) {
  // O ID vem do middleware checkUserId que vamos usar na rota
  const userId = req.user.id;

  // Busca no banco de dados (usando a configuração do Knex que fizemos)
  const user = await db('users').where({ id: userId }).first();

  if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }

  // Retorna os dados (sem mandar informações sensíveis se houver)
  return res.json({
    id: user.id,
    name: user.name,
    email: user.email,
  });
}
*/
import { v4 as uuid } from 'uuid';
import { db } from '../database.js';

// 1. Atualize o createUser para receber e salvar a senha
export async function createUser(req, res) {
  const { name, email, password } = req.body; // Pega a senha

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: 'Nome, email e senha são obrigatórios' });
  }

  // Verifica se o email já existe
  const userExists = await db('users').where({ email }).first();
  if (userExists) {
    return res.status(400).json({ error: 'Email já cadastrado' });
  }

  const newUser = {
    id: uuid(),
    name,
    email,
    password, // Salva no banco
  };

  await db('users').insert(newUser);

  return res.status(201).json({ id: newUser.id, name: newUser.name });
}

// 2. Crie a função de Login
export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }

  // Busca usuário pelo email
  const user = await db('users').where({ email }).first();

  // Verifica se usuário existe e se a senha bate
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Email ou senha inválidos' });
  }

  // Retorna o ID para o frontend salvar
  return res.json({
    id: user.id,
    name: user.name,
    email: user.email,
  });
}

// ... (Mantenha o getUserProfile como estava)
export async function getUserProfile(req, res) {
  const userId = req.user.id;
  const user = await db('users').where({ id: userId }).first();
  if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
  return res.json({ id: user.id, name: user.name, email: user.email });
}
