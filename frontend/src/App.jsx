import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import RegisterUser from './pages/RegisterUser';
import MealsList from './pages/MealsList';
import MealView from './pages/MealView';
import CreateEditMeal from './pages/CreateEditMeal';
import Metrics from './pages/Metrics';
import Header from './components/Header';
import { setUserIdHeader } from './api/api';

export default function App() {
  const [userId, setUserId] = useState(localStorage.getItem('userId') || null);

  // Garante que o header do axios esteja configurado se o usuário já estiver logado
  if (userId) {
    setUserIdHeader(userId);
  }

  // Função única para Login ou Cadastro
  function onUserLogin(id) {
    localStorage.setItem('userId', id);
    setUserId(id);
    setUserIdHeader(id);
  }

  return (
    <>
      <div className="app-shell">
        {/* Só mostra o Header se estiver logado */}
        {userId && <Header />}

        <main className="container">
          <Routes>
            {/* Rota Raiz: Se logado -> Refeições, Senão -> Home */}
            <Route
              path="/"
              element={userId ? <Navigate to="/meals" /> : <Home />}
            />

            {/* Rotas Públicas */}
            <Route path="/login" element={<Login onLogin={onUserLogin} />} />
            <Route
              path="/register"
              element={<RegisterUser onCreated={onUserLogin} />}
            />

            {/* Rotas Privadas (Protegidas) */}
            <Route
              path="/meals"
              element={userId ? <MealsList /> : <Navigate to="/" />}
            />
            <Route
              path="/meals/:id"
              element={userId ? <MealView /> : <Navigate to="/" />}
            />
            <Route
              path="/create"
              element={userId ? <CreateEditMeal /> : <Navigate to="/" />}
            />
            <Route
              path="/edit/:id"
              element={
                userId ? <CreateEditMeal editMode /> : <Navigate to="/" />
              }
            />
            <Route
              path="/metrics"
              element={userId ? <Metrics /> : <Navigate to="/" />}
            />
          </Routes>
        </main>
      </div>
    </>
  );
}
