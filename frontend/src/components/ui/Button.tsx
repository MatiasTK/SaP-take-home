import { ReactNode, MouseEvent } from 'react';

interface ButtonProps {
  children: ReactNode;
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({ children, disabled, onClick, type }: ButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type || 'button'}
      className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition-colors duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed
  "
    >
      {children}
    </button>
  );
}
