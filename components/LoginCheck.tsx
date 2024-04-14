import getUserId from "@/actions/getUserId";
import React, { ReactNode } from "react";
import NeedToLogin from "./NeedToLogin";

interface Props {
  children: ReactNode;
}

async function LoginCheck({ children }: Props) {
  const userId = await getUserId();

  return userId ? <>{children}</> : <NeedToLogin />;
}

export default LoginCheck;
