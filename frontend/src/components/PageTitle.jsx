import React from 'react';

export default function PageTitle({ children, subtitle }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <h2 style={{ margin: 0 }}>{children}</h2>
      {subtitle && (
        <div className="kv" style={{ marginTop: 6 }}>
          {subtitle}
        </div>
      )}
    </div>
  );
}
