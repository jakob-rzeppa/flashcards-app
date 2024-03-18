import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  params: { courseName: string };
}

function FolderLayout({ children, params }: Props) {
  return <div>{children}</div>;
}

export default FolderLayout;
