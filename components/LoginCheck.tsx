import React, { ReactNode } from "react";
import NeedToLogin from "./NeedToLogin";
import { createClient } from "@/utils/supabase/server";

interface Props {
  children: ReactNode;
}

async function LoginCheck({ children }: Props) {
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  return user.data.user && !user.error ? <>{children}</> : <NeedToLogin />;
}

export default LoginCheck;
