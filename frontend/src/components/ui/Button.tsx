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
      className="bg-primary text-white py-2 px-4 rounded hover:bg-primary/50 focus:outline-none focus:ring-2  focus:ring-gray-400
       focus:ring-opacity-50 transition-colors duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2
  "
    >
      {children}
    </button>
  );
}
