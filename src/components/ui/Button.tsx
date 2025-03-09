// components/ui/Button.tsx
import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ className, children, ...props }) => {
  return (
    <button className={`bg-blue-600 text-white px-4 py-2 rounded ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;