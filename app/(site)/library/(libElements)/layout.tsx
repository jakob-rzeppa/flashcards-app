import NavButton from "@/components/navigation/NavButton";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function LibraryLayout({ children }: Props) {
  return (
    <div className="relative">
      <NavButton className="absolute top-0 left-4 z-10" />
      {children}
    </div>
  );
}

export default LibraryLayout;
