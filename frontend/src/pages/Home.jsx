import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import logoImg from '../assets/logo.png';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div
      className="page"
      style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}
    >
      <Card className="center" style={{ maxWidth: '400px', width: '100%' }}>
        <center>
          {' '}
          <img
            src={logoImg}
            alt="Logo Daily Diet"
            className="brand-logo"
            style={{
              objectFit: 'contain',
              background: 'transparent',
              width: '150px',
              height: '150px',
              borderRadius: '0',
              boxShadow: 'none',
            }}
          />
        </center>
        <h2>Bem-vindo ao Daily Diet</h2>
        <p>Controle sua alimentação de forma simples.</p>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginTop: '30px',
          }}
        >
          <Button onClick={() => navigate('/login')}>
            Já tenho conta (Login)
          </Button>

          <Button
            variant="ghost"
            onClick={() => navigate('/register')}
            style={{ border: '1px solid #ddd' }}
          >
            Criar nova conta
          </Button>
        </div>
      </Card>
    </div>
  );
}
