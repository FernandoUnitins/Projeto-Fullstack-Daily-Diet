import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import Button from '../components/Button';
import toast from 'react-hot-toast';

export default function Metrics() {
  const [metrics, setMetrics] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get('/meals/metrics')
      .then(r => setMetrics(r.data))
      .catch(() => toast.error('Erro ao buscar métricas'));
  }, []);

  if (!metrics) return <div className="center">Carregando estatísticas...</div>;

  // Cálculo da porcentagem de acerto
  const percentage =
    metrics.total > 0 ? ((metrics.onDiet / metrics.total) * 100).toFixed(1) : 0;

  // Decide a cor do texto principal baseada na nota
  const isPositive = percentage >= 50;
  const percentageColor = isPositive ? 'var(--success)' : 'var(--danger)';

  return (
    <div className="page">
      {/* Cabeçalho com a Porcentagem em Destaque */}
      <div className="metrics-header">
        <h2
          style={{
            fontSize: '1.4rem',
            marginBottom: '8px',
            color: 'var(--text)',
          }}
        >
          Estatísticas Gerais
        </h2>
        <h1 className="percentage-display" style={{ color: percentageColor }}>
          {percentage}%
        </h1>
        <p className="percentage-label">das refeições dentro da dieta</p>
      </div>

      <div className="metrics-grid">
        {/* Melhor Sequência (Destaque) */}
        <div className="stat-box highlight">
          <span className="stat-number">{metrics.bestStreak}</span>
          <span className="stat-desc">
            melhor sequência de refeições dentro da dieta
          </span>
        </div>

        {/* Total Geral */}
        <div className="stat-box">
          <span className="stat-number">{metrics.total}</span>
          <span className="stat-desc">refeições registradas</span>
        </div>

        {/* Placeholder para ocupar espaço se quiser ou deixar vazio */}
        <div
          className="stat-box"
          style={{ background: 'transparent', boxShadow: 'none' }}
        >
          {/* Espaço vazio ou outra métrica futura */}
        </div>

        {/* Dentro da Dieta (Verde) */}
        <div className="stat-box green">
          <span className="stat-number">{metrics.onDiet}</span>
          <span className="stat-desc">refeições dentro da dieta</span>
        </div>

        {/* Fora da Dieta (Vermelho) */}
        <div className="stat-box red">
          <span className="stat-number">{metrics.offDiet}</span>
          <span className="stat-desc">refeições fora da dieta</span>
        </div>
      </div>

      <div style={{ marginTop: '24px', textAlign: 'center' }}>
        <Button variant="ghost" onClick={() => navigate('/meals')}>
          Voltar
        </Button>
      </div>
    </div>
  );
}
