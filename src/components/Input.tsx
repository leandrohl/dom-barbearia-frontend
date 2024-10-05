import React from 'react';

interface InputProps {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  className?: string;
  variant?: "primary" | "secondary"
}


const Input = ({ name, label, onChange, value, className = '', type = 'text', variant="primary" }: InputProps) => {
  let classNameInput = "p-2 mt-1 block w-full h-9 rounded-md shadow-sm bg-gray-700 text-gray-200";

  if (variant === "secondary") {
    classNameInput = "border border-gray-300 p-2 w-full rounded text-primary";
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
      />
    </div>
  );
};

export default Input;
