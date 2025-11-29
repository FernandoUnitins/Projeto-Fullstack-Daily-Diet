import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { setUserIdHeader } from '../api/api';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import toast from 'react-hot-toast';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await api.post('/users/login', { email, password });

      // Chama a função que atualiza o estado global no App.jsx
      onLogin(data.id);

      toast.success(`Bem-vindo de volta, ${data.name}!`);
      navigate('/meals');
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || 'Erro ao fazer login');
    }
  }

  return (
    <div className="page">
      <Card>
        <h2>Fazer Login</h2>
        <form onSubmit={handleSubmit}>
          <Input
            label="E-mail de login"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <Input
            label="Senha"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <div style={{ display: 'flex', gap: '10px' }}>
            <Button type="submit" className="btn-primary" style={{ flex: 1 }}>
              Entrar
            </Button>

            <Button
              type="button"
              variant="ghost"
              onClick={() => navigate('/')}
              style={{ flex: 1 }}
            >
              Cancelar
            </Button>
          </div>

          <div
            style={{ marginTop: '16px', fontSize: '14px', textAlign: 'center' }}
          >
            Não tem conta?{' '}
            <span
              style={{ color: 'blue', cursor: 'pointer' }}
              onClick={() => navigate('/register')}
            >
              Cadastre-se
            </span>
          </div>
        </form>
      </Card>
    </div>
  );
}
