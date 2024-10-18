import { SelectOption } from '@/@types/utils';
import React from 'react';
import Select, { MultiValue } from 'react-select';

interface MultiSelectProps {
  name: string;
  label: string;
  options: SelectOption[];
  onChange: (newValue: MultiValue<SelectOption>) => void
  value: SelectOption[] | null;
  errorMessage?: string;
  className?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  name,
  label,
  options,
  onChange,
  value,
  errorMessage,
  className,
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-primary mb-2" htmlFor={name}>
        {label}
      </label>
      <Select
        id={name}
        name={name}
        options={options}
        onChange={onChange}
        value={value}
        isMulti
        className={`react-select text-primary`}
        classNamePrefix="select"
        placeholder="Selecione..."
        styles={{
          control: (base) => ({
            ...base,
            borderColor: errorMessage ? 'red' : base.borderColor
          }),
        }}

      />
      {errorMessage && (
        <span className='text-red-500 text-sm mt-1'>{errorMessage}</span>
      )}
    </div>
  );
};

export default MultiSelect;
