import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function Header({ children }: Props) {
  return <div>{children}</div>;
}

export default Header;
