import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function Form({ children }: Props) {
  return (
    <div className="md:w-1/3 w-2/3 md:min-w-96 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
        {children}
      </form>
    </div>
  );
}

export default Form;
