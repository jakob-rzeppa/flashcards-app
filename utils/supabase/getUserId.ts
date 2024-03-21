import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function getUserId() {
  const supabase = createClientComponentClient();

  const user = await supabase.auth.getUser();

  if (user.data == null) {
    return null;
  }

  return user.data.user?.id;
}
