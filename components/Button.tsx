import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick: () => void;
}

const Button = ({ children, onClick }: Props) => {
  return (
    <button
      className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
