import React, { ReactNode } from "react";

import LoginCheck from "@/components/LoginCheck";
import Header from "@/components/navigation/Header";

interface Props {
  children: ReactNode;
}

function SiteLayout({ children }: Props) {
  // TODO Login Check
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default SiteLayout;
