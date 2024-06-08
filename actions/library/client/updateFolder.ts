import { createClient } from "@/utils/supabase/client";

export default async function updateFolder(
  id: number,
  data: { name?: string; parent_folder?: number | null }
) {
  const supabase = createClient();

  const res = await supabase.from("folders").update(data).eq("id", id);

  if (res.error) {
    console.error(res.error);
    return false;
  }

  console.log("Updated Folder", res.data);
  return true;
}
