import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <button
      className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
