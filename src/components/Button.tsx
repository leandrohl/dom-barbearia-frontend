import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant: 'primary' | 'primary-outline'
}

const Button = ({ children, onClick, variant = 'primary' }: ButtonProps) => {
  const baseStyles = "px-4 py-2 rounded-md focus:outline-none focus:ring";

  const variantStyles = variant === 'primary'
    ? "bg-primary hover:brightness-90 text-secondary"
    : "bg-secondary border border-primary hover:bg-primary hover:text-white text-primary";

  return (
    <button className={`${baseStyles} ${variantStyles}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
