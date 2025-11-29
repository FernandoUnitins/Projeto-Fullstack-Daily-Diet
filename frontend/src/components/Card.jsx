import React from 'react';

export default function Card({ children, className = '' }) {
  return <div className={`page-card ${className}`}>{children}</div>;
}
