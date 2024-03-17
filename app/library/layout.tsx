import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function LibraryLayout({ children }: Props) {
  return <div>{children}</div>;
}

export default LibraryLayout;
