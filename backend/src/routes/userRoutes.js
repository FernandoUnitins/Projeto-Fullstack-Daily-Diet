import { Router } from 'express';
// 1. ADICIONE O 'login' DENTRO DAS CHAVES ABAIXO
import {
  createUser,
  getUserProfile,
  login,
} from '../controllers/userController.js';
import { checkUserId } from '../middlewares/checkUserId.js';

const router = Router();

router.post('/', createUser);
router.post('/login', login); // Agora vai funcionar porque foi importado lá em cima
router.get('/me', checkUserId, getUserProfile);

export default router;

/* v2
import { Router } from 'express';
import { createUser, getUserProfile } from '../controllers/userController.js'; // Importe a nova função
import { checkUserId } from '../middlewares/checkUserId.js'; // Importe o middleware

const router = Router();

// Rota de criação (pública)
router.post('/', createUser);
router.post('/login', login);

// Rota de perfil (privada - precisa estar logado)
// O '/me' é uma convenção para "eu mesmo" (usuário logado)
router.get('/me', checkUserId, getUserProfile);

export default router;
*/

/* v1
import { Router } from 'express';
import { createUser } from '../controllers/userController.js';
const router = Router();

router.post('/', createUser);

export default router;
*/
