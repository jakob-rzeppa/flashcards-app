import { createClient } from "@/utils/supabase/client";

async function getUserId() {
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  if (!user.data.user || user.error) {
    return null;
  }

  const userId = user.data.user.id;

  return userId;
}

export default getUserId;
