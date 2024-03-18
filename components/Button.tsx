import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick: () => void;
  shape: "round" | "normal";
  classes?: string;
}

const Button = ({ children, onClick, shape, classes }: Props) => {
  return (
    <button
      className={`${classes} px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none ${
        shape === "round" ? "w-12 h-12 rounded-full" : ""
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
