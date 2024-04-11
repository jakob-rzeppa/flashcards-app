import React from "react";
import AuthButton from "./header/AuthButton";

function NeedToLogin() {
  return (
    <div className="flex flex-col justify-center items-center gap-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="text-2xl">You need to log in!</div>
      <AuthButton />
    </div>
  );
}

export default NeedToLogin;
