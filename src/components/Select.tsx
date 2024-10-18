import { SelectOption } from '@/@types/utils';
import React from 'react';

interface SelectProps {
  name: string;
  label: string;
  value: string | string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  className?: string;
  variant?: "primary" | "secondary";
  errorMessage?: string;
  multiple?: boolean;
}

const Select = ({
  name,
  label,
  onChange,
  value,
  options,
  className = '',
  variant = "primary",
  errorMessage
}: SelectProps) => {
  let classNameSelect = "p-2 mt-1 block w-full h-9 rounded-md shadow-sm bg-gray-700 text-gray-200";

  if (variant === "secondary") {
    classNameSelect = "border border-gray-300 h-9 p-2 w-full rounded text-primary ";
  }

  if (errorMessage) {
    classNameSelect += "border border-red-500 text-primary ";
  }


  return (
    <div className={`mb-4 ${className}`}>
      <label
        htmlFor={name}
        className={`block ${variant === "primary" ? "text-white" : "text-primary"} `}>
        {label}
      </label>
      <select
        name={name}
        onChange={onChange}
        value={value || ""}
        className={classNameSelect}
      >
        <option value="" disabled>
          Selecione uma opção
        </option>
        {options.map((option: SelectOption) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errorMessage && (
        <span className='text-red-500 text-sm mt-1'>{errorMessage}</span>
      )}
    </div>
  );
};

export default Select;
