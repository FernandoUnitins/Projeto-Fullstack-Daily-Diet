import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/api';
import Card from '../components/Card';
import Button from '../components/Button';
import toast from 'react-hot-toast';

export default function MealView() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/meals/${id}`)
      .then(r => setMeal(r.data))
      .catch(() => {
        toast.error('Não encontrado');
        navigate('/meals');
      });
  }, [id]);

  if (!meal) return <div className="center">Carregando...</div>;

  return (
    <div className="page">
      <Card>
        <h2>{meal.name}</h2>
        <p style={{ color: '#555' }}>{meal.description}</p>
        <p className="meal-meta">
          Data: {new Date(meal.dateTime).toLocaleString()}
        </p>
        <p className="meal-meta">
          {meal.onDiet ? 'Dentro da dieta' : 'Fora da dieta'}
        </p>
        <div style={{ marginTop: 12 }}>
          <Button onClick={() => navigate(-1)} className="btn-ghost">
            Voltar
          </Button>
        </div>
      </Card>
    </div>
  );
}
