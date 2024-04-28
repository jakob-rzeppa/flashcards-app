import React, { ReactNode } from "react";

function BackgroundBox({ children }: { children: ReactNode }) {
  return (
    <div className="bg-base-200 w-4/5 mx-auto p-4 flex flex-col justify-center items-center rounded-xl gap-4 relative">
      {children}
    </div>
  );
}

export default BackgroundBox;
