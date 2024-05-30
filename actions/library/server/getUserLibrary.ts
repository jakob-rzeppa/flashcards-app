import { createClient } from "@/utils/supabase/server";

export default async function getUserLibrary() {
  const supabase = createClient();

  const user = await supabase.auth.getUser();

  if (user.error || !user.data) {
    console.error(user.error);
    return { folders: [], stacks: [] };
  }

  const folders = await supabase
    .from("folders")
    .select("*")
    .eq("user_id", user.data.user.id);

  if (folders.error || !folders.data) {
    console.error(folders.error);
    return { folders: [], stacks: [] };
  }

  const stacks = await supabase
    .from("stacks")
    .select("*")
    .eq("user_id", user.data.user.id);

  if (stacks.error || !stacks.data) {
    console.error(stacks.error);
    return { folders: [], stacks: [] };
  }

  return { folders: folders.data, stacks: stacks.data };
}
