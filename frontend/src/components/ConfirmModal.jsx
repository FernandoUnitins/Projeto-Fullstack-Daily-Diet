import React from 'react';

export default function ConfirmModal({
  title = 'Confirmar',
  message,
  onCancel,
  onConfirm,
}) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.3)',
      }}
    >
      <div
        style={{
          background: '#fff',
          padding: 20,
          borderRadius: 12,
          minWidth: 320,
        }}
      >
        <h3>{title}</h3>
        <p style={{ color: '#444' }}>{message}</p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 8,
            marginTop: 12,
          }}
        >
          <button onClick={onCancel} className="btn btn-ghost">
            Cancelar
          </button>
          <button onClick={onConfirm} className="btn btn-primary">
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
