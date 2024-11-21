import React from 'react';

interface InputProps {
  name: string;
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  className?: string;
  variant?: "primary" | "secondary",
  errorMessage?: string;
  disabled?: boolean;
}


const Input = ({ name, label, onChange, value, className = '', type = 'text', variant="primary", errorMessage, disabled = false }: InputProps) => {
  let classNameInput = "p-2 mt-1 block w-full h-9 rounded-md shadow-sm bg-gray-700 text-gray-200 ";

  if (variant === "secondary") {
    classNameInput = "border h-9 border-gray-300 p-2 w-full rounded text-primary ";
  }

  if (errorMessage) {
    classNameInput += "text-primary border border-red-500 ";
  }

  if (disabled) {
    classNameInput += "cursor-not-allowed opacity-35";
  }

  return (
    <div className={`mb-4 ${className}`}>
      <label
        htmlFor={name}
        className={`block ${variant === "primary" ? "text-white" : "text-primary"} `}>
        {label}
      </label>
      <input
        name={name}
        onChange={onChange}
        value={value}
        type={type}
        className={classNameInput}
        disabled={disabled}
      />
      {errorMessage && (
        <span className='text-red-500 text-sm mt-1'>{errorMessage}</span>
      )}
    </div>
  );
};

export default Input;
