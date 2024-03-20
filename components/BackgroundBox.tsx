import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function BackgroundBox({ children }: Props) {
  return (
    <div className="w-max max-w-x bg-neutral-900 p-8 rounded mx-auto">
      {children}
    </div>
  );
}

export default BackgroundBox;
