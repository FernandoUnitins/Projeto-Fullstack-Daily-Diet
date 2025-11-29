import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import toast from 'react-hot-toast';

export default function RegisterUser({ onCreated }) {
  // Usando a mesma prop onCreated/onLogin
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Novo estado
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      // Envia a senha agora
      const { data } = await api.post('/users', { name, email, password });

      onCreated(data.id);

      toast.success('Conta criada com sucesso!');
      navigate('/meals');
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || 'Erro ao criar usuário');
    }
  }

  return (
    <div className="page">
      <Card>
        <h2>Criar Conta</h2>
        <form onSubmit={handleSubmit}>
          <Input
            label="Nome"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
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
              Cadastrar
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
            Já tem conta?{' '}
            <span
              style={{ color: 'blue', cursor: 'pointer' }}
              onClick={() => navigate('/login')}
            >
              Faça Login
            </span>
          </div>
        </form>
      </Card>
    </div>
  );
}
