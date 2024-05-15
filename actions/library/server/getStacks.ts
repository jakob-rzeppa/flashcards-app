import { createClient } from "@/utils/supabase/server";

export default async function getStacks() {
  const supabase = createClient();

  const user = await supabase.auth.getUser();

  if (user.error) {
    console.error("No User");
    return [];
  }

  const userId = user.data.user!.id;

  const { data, error } = await supabase
    .from("stacks")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error(error);
    return [];
  }

  if (!data) {
    return [];
  }

  return data;
}
