import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant: 'primary'
}

const Button = ({ children, onClick, variant = 'primary' }: ButtonProps) => {
  const baseStyles = "px-4 py-2 rounded-md font-semibold focus:outline-none focus:ring";

  const variantStyles = variant === 'primary'
    ? "bg-primary hover:brightness-90 text-secondary"
    : "bg-gray-500 hover:bg-gray-600 text-white";

  return (
    <button className={`${baseStyles} ${variantStyles}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
