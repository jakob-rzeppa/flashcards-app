import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function Table({ children }: Props) {
  return (
    <table className="table table-zebra table-xs w-4/5 mx-auto overflow-hidden rounded-lg">
      {children}
    </table>
  );
}

export default Table;
