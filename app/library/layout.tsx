import React, { ReactNode } from "react";

import Header from "@/components/header/Header";
import LoginCheck from "@/components/LoginCheck";

interface Props {
  children: ReactNode;
}

function LibraryLayout({ children }: Props) {
  return (
    <div>
      <LoginCheck>
        <Header />
        {children}
      </LoginCheck>
    </div>
  );
}

export default LibraryLayout;
