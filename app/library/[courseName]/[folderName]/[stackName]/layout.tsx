import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  params: { stackName: string };
}

function StackLayout({ children, params }: Props) {
  return <div>{children}</div>;
}

export default StackLayout;
