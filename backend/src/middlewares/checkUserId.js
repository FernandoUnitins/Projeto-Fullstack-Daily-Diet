export async function checkUserId(req, res, next) {
  const userId = req.headers['x-user-id'];

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized: User ID not found.' });
  }

  // Coloca o ID dentro da requisição para os controllers usarem
  req.user = {
    id: userId,
  };

  next();
}
