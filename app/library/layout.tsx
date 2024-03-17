import React, { ReactNode } from "react";

import Header from "@/components/Header";

interface Props {
  children: ReactNode;
}

function LibraryLayout({ children }: Props) {
  return (
    <div>
      <Header>
        <h1>Library</h1>
      </Header>
      {children}
    </div>
  );
}

export default LibraryLayout;
