import { createClient } from "@/utils/supabase/server";

export async function getFolderData(id: number) {
  const supabase = createClient();

  const folder = await supabase.from("folders").select("*").eq("id", id);

  const stacks = await supabase.from("stacks").select("*").eq("folder_id", id);

  if (folder.error) {
    console.error(folder.error);
    return { data: null, stacks: null };
  }

  if (folder.data.length === 0) {
    console.error("FolderId not found!");
    return { data: null, stacks: null };
  }

  if (stacks.error) {
    console.error(stacks.error);
    return { data: folder.data[0], stacks: null };
  }

  return { data: folder.data[0], cards: stacks.data };
}
