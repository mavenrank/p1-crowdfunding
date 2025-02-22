import * as React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Card = ({ className, children, ...props }: CardProps) => {
  return (
    <div className={`bg-white shadow-md rounded-lg p-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

const CardContent = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};

export { Card, CardContent };