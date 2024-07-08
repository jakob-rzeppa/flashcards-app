import React, { ReactNode } from "react";

function BackgroundBox({ children }: { children: ReactNode }) {
  return (
    <div className="bg-base-200 w-4/5 mx-auto p-4 rounded-xl">{children}</div>
  );
}

export default BackgroundBox;
