import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function Header({ children }: Props) {
  return (
    <div className="flex flex-nowrap justify-between items-center p-2">
      {children}
    </div>
  );
}

export default Header;
