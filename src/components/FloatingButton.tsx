import React from 'react';

interface FABProps {
  onClick: () => void;
  variant: 'primary' | 'primary-outline';
  loading?: boolean;
  icon: React.ReactNode;
}

const FloatingActionButton = ({
  onClick,
  variant = 'primary',
  loading = false,
  icon,
}: FABProps) => {
  const baseStyles = "w-12 h-12 flex items-center justify-center rounded-full fixed bottom-6 right-6 focus:outline-none focus:ring";

  const variantStyles =
    variant === 'primary'
      ? "bg-primary hover:brightness-90 text-secondary"
      : "bg-secondary border border-primary hover:bg-primary hover:text-white text-primary";

  const loadingStyles = loading ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${loadingStyles}`}
      onClick={onClick}
      disabled={loading}
    >
      {loading ? (
        <span className="inline-block w-5 h-5 border-4 border-t-transparent border-white rounded-full animate-spin"></span>
      ) : (
        icon
      )}
    </button>
  );
};

export default FloatingActionButton;
