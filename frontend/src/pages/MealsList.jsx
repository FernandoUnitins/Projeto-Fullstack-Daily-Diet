import React, { useEffect, useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom'; // Importe useNavigate aqui
import api from '../api/api';
import Card from '../components/Card';
import Button from '../components/Button';
import toast from 'react-hot-toast';

export default function MealsList() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 1. Pega id do usuário
  const userId = localStorage.getItem('userId');

  // 2. CORREÇÃO: Se não tiver userId, manda para /register (antes estava /create)
  if (!userId) {
    return <Navigate to="/register" />;
  }

  async function load() {
    try {
      setLoading(true);
      // O userId já vai no header via checkUserId middleware, não precisa de params
      const response = await api.get('/meals');
      setMeals(response.data);
    } catch (err) {
      console.error(err);

      // 3. NOVO: Se der erro 400 ou 401 (Usuário não encontrado ou não autorizado)
      if (
        err.response &&
        (err.response.status === 400 || err.response.status === 401)
      ) {
        toast.error('Sessão inválida. Faça login novamente.');
        localStorage.removeItem('userId'); // Apaga o ID inválido
        navigate('/register'); // Joga para o cadastro
      } else {
        toast.error('Erro ao carregar refeições');
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id) {
    // 1. Pergunta ao usuário
    const confirmDelete = window.confirm(
      'Deseja realmente apagar esta refeição? Essa ação não pode ser desfeita.'
    );

    // 2. Se o usuário clicar em "Cancelar", a função para aqui (return) e não apaga nada.
    if (!confirmDelete) {
      return;
    }

    // 3. Se chegou aqui, é porque clicou em OK. Prossegue com a exclusão.
    try {
      await api.delete(`/meals/${id}`);
      toast.success('Refeição removida');
      load(); // Recarrega a lista
    } catch (err) {
      console.error(err);
      toast.error('Erro ao remover');
    }
  }
  return (
    <div className="page">
      <Card>
        <div
          className="row"
          style={{ justifyContent: 'space-between', alignItems: 'center' }}
        >
          <h2>Refeições cadastradas</h2>
          <Button onClick={() => navigate('/create')}>Nova Refeição</Button>
        </div>

        {loading && <p style={{ marginTop: 12 }}>Carregando...</p>}

        <div className="meal-list" style={{ marginTop: 12 }}>
          {!loading && meals.length === 0 && (
            <div className="center">Nenhuma refeição cadastrada.</div>
          )}

          {!loading &&
            meals.map(m => (
              <div key={m.id} className="meal-card">
                <div>
                  <div style={{ fontWeight: 700 }}>{m.name}</div>
                  <div className="meal-meta">
                    {new Date(m.dateTime).toLocaleString()}
                  </div>
                  <div className="meal-meta">
                    {m.onDiet ? 'Dentro da dieta' : 'Fora da dieta'}
                  </div>
                </div>

                <div className="actions">
                  <Link to={`/meals/${m.id}`}>
                    <button className="btn btn-ghost">Ver</button>
                  </Link>
                  <Link to={`/edit/${m.id}`}>
                    <button className="btn btn-ghost">Editar</button>
                  </Link>
                  <Button variant="danger" onClick={() => handleDelete(m.id)}>
                    Apagar
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </Card>
    </div>
  );
}
