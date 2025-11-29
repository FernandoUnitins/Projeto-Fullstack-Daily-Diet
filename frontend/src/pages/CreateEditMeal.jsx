import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/api';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import toast from 'react-hot-toast';

export default function CreateEditMeal({ editMode = false }) {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [onDiet, setOnDiet] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      api
        .get(`/meals/${id}`)
        .then(r => {
          const m = r.data;
          setName(m.name);
          setDescription(m.description || '');
          setDateTime(new Date(m.dateTime).toISOString().slice(0, 16));
          setOnDiet(m.onDiet);
        })
        .catch(() => toast.error('Erro ao carregar refeição'));
    }
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      name,
      description,
      dateTime: new Date(dateTime).toISOString(),
      onDiet,
    };
    try {
      if (id) {
        await api.put(`/meals/${id}`, payload);
        toast.success('Atualizado');
      } else {
        await api.post('/meals', payload);
        toast.success('Criado');
      }
      navigate('/meals');
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || 'Erro');
    }
  }

  return (
    <div className="page">
      <Card>
        <h2>{id ? 'Editar Refeição' : 'Nova Refeição'}</h2>
        <form onSubmit={handleSubmit}>
          <Input
            label="Nome"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <Input
            label="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <div className="form-row">
            <label>Data e hora</label>
            <input
              className="input"
              type="datetime-local"
              value={dateTime}
              onChange={e => setDateTime(e.target.value)}
              required
            />
          </div>
          <div className="form-row">
            <label>Dentro da dieta?</label>
            <select
              className="input"
              value={onDiet ? 'true' : 'false'}
              onChange={e => setOnDiet(e.target.value === 'true')}
            >
              <option value="true">Sim</option>
              <option value="false">Não</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
            <Button type="submit" style={{ flex: 1 }}>
              Salvar
            </Button>

            <Button
              type="button"
              variant="ghost"
              onClick={() => navigate('/meals')}
              style={{ flex: 1 }}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
