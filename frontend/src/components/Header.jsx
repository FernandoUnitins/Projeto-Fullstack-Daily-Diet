import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../api/api';
import logoImg from '../assets/logo.png';

export default function Header() {
  const loc = useLocation();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    if (userId) {
      api
        .get('/users/me')
        .then(response => {
          setUserName(response.data.name);
        })
        .catch(err => {
          console.error('Erro ao buscar usuário', err);
        });
    }
  }, []);

  return (
    <header className="header">
      <div className="brand">
        <img
          src={logoImg}
          alt="Logo Daily Diet"
          className="brand-logo"
          style={{ objectFit: 'contain', background: 'transparent' }}
        />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h1 style={{ fontSize: '18px', margin: 0 }}>Daily Diet </h1>
          {userName && (
            <span style={{ fontSize: '18px', fontWeight: 400, opacity: 0.8 }}>
              Olá, {userName}
            </span>
          )}
        </div>
      </div>

      <nav className="nav">
        <Link
          className={loc.pathname.startsWith('/meals') ? 'active' : ''}
          to="/meals"
        >
          REFEIÇÕES
        </Link>
        |
        <Link
          className={loc.pathname === '/metrics' ? 'active' : ''}
          to="/metrics"
        >
          DESEMPENHO
        </Link>
        |
        <button
          onClick={() => {
            // Abre a janelinha de confirmação
            const desejaSair = window.confirm(
              'Tem certeza que deseja sair do sistema?'
            );

            // Só executa se o usuário clicou em "OK"
            if (desejaSair) {
              localStorage.removeItem('userId');
              window.location.href = '/';
            }
          }}
          className="btn-ghost"
          style={{ padding: '4px 8px', fontSize: '12px', marginLeft: '10px' }}
        >
          SAIR
        </button>
      </nav>
    </header>
  );
}
