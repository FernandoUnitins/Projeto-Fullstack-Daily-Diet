import React from 'react';

export default function Input({ label, ...props }) {
  return (
    <div className="form-row">
      {label && <label>{label}</label>}
      <input className="input" {...props} />
    </div>
  );
}
