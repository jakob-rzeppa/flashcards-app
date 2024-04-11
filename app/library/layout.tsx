import React, { ReactNode } from "react";

import LoginCheck from "@/components/LoginCheck";

interface Props {
  children: ReactNode;
}

function LibraryLayout({ children }: Props) {
  return (
    <div>
      <LoginCheck>{children}</LoginCheck>
    </div>
  );
}

export default LibraryLayout;
