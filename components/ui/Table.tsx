import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function Table({ children }: Props) {
  return <table className="table table-zebra table-xs w-4/5">{children}</table>;
}

export default Table;
