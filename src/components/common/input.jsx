import React from "react";

const Input = ({ name, label, value, error, onChang, type ,placeholder}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        autoFocus
        value={value}
        onChange={onChang}
        id={name}
        name={name}
        type={type}
        className="form-control" 
        placeholder={placeholder}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
