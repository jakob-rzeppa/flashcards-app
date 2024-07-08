import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick: () => void;
}

function Row({ children, onClick }: Props) {
  return (
    <tr className="hover cursor-pointer" onClick={onClick}>
      {children}
    </tr>
  );
}

export default Row;
