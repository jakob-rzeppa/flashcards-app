import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function Table({ children }: Props) {
  return <table className="table table-zebra table-lg">{children}</table>;
}

export default Table;
