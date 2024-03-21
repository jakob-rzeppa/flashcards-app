import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick?: () => void;
}

function Button({ children, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      {children}
    </button>
  );
}

export default Button;
