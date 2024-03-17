import React, { ReactNode } from "react";

import Header from "@/components/Header";

interface Props {
  children: ReactNode;
}

function LibraryLayout({ children }: Props) {
  return <div>{children}</div>;
}

export default LibraryLayout;
