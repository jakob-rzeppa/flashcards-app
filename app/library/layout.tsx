import Header from "@/components/Header";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function LibraryLayout({ children }: Props) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default LibraryLayout;
