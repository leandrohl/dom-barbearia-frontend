import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant: 'primary' | 'primary-outline',
  loading?: boolean;
}

const Button = ({ children, onClick, variant = 'primary', loading = false }: ButtonProps) => {
  const baseStyles = "px-4 py-2 rounded-md focus:outline-none focus:ring";

  const variantStyles = variant === 'primary'
    ? "bg-primary hover:brightness-90 text-secondary"
    : "bg-secondary border border-primary hover:bg-primary hover:text-white text-primary";

  const loadingStyles = loading ? 'opacity-50 cursor-not-allowed flex items-center py-2' : '';

  return (
    <button className={`${baseStyles} ${variantStyles} ${loadingStyles}`} onClick={onClick} disabled={loading}>
      {loading ? (
         <span className="inline-block w-5 h-5 border-4 border-t-transparent border-white rounded-full animate-spin"></span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
