import { createClient } from "@/utils/supabase/server";

export default async function getFullLibrary() {
  const supabase = createClient();

  const folders = await supabase
    .from("folders")
    .select("*")
    .order("created_at");

  if (folders.error || !folders.data) {
    console.error(folders.error);
    return { folders: [], stacks: [] };
  }

  const stacks = await supabase.from("stacks").select("*").order("created_at");

  if (stacks.error || !stacks.data) {
    console.error(stacks.error);
    return { folders: [], stacks: [] };
  }

  return { folders: folders.data, stacks: stacks.data };
}
