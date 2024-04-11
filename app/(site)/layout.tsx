import React, { ReactNode } from "react";

import LoginCheck from "@/components/LoginCheck";

interface Props {
  children: ReactNode;
}

function SiteLayout({ children }: Props) {
  return (
    <div>
      <LoginCheck>{children}</LoginCheck>
    </div>
  );
}

export default SiteLayout;
