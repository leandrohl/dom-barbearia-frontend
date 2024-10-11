import React from 'react';

interface CheckboxProps {
  name: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  errorMessage?: string;
}

const Checkbox = ({ name, label, onChange, checked, className = '', errorMessage }: CheckboxProps) => {
  let classNameCheckbox = "h-6 w-6 mt-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500";

  if (errorMessage) {
    classNameCheckbox += " border border-red-500";
  }

  return (
    <div className={`mb-4 flex flex-col ${className}`}>
      <label
        htmlFor={name}
        className='text-primary'>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={classNameCheckbox}
      />
      {errorMessage && (
        <span className='text-red-500 text-sm mt-1'>{errorMessage}</span>
      )}
    </div>
  );
};

export default Checkbox;
