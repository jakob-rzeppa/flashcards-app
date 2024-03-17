import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function BackgroundBox({ children }: Props) {
  return (
    <div className="w-full max-w-xl bg-white p-8 rounded shadow-lg mx-auto">
      {children}
    </div>
  );
}

export default BackgroundBox;
