import React, { ReactNode } from "react";

import LoginCheck from "@/components/LoginCheck";
import Header from "@/components/navigation/Header";

interface Props {
  children: ReactNode;
}

function SiteLayout({ children }: Props) {
  return (
    <div>
      <Header />
      <LoginCheck>{children}</LoginCheck>
    </div>
  );
}

export default SiteLayout;
