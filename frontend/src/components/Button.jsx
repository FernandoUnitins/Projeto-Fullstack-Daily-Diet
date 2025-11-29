import React from 'react';

export default function Button({
  children,
  variant = 'primary',
  onClick,
  type = 'button',
  className = '',
}) {
  const cls = `btn ${
    variant === 'primary'
      ? 'btn-primary'
      : variant === 'danger'
      ? 'btn-danger'
      : 'btn-ghost'
  } ${className}`;
  return (
    <button type={type} className={cls} onClick={onClick}>
      {children}
    </button>
  );
}
