import React from 'react';

interface InputProps {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  className?: string;
}


const Input = ({ name, label, onChange, value, className = '', type = 'text' }: InputProps) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={name} className="block text-gray-300 font-sans">{label}</label>
      <input
        name={name}
        onChange={onChange}
        value={value}
        type={type}
        className="p-2 mt-1 block w-full h-9 rounded-md shadow-sm bg-gray-700 text-gray-200"
      />
    </div>
  );
};

export default Input;
