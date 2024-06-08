import { createClient } from "@/utils/supabase/client";

export async function deleteFolder(id: number) {
  const supabase = createClient();

  const { data, error } = await supabase.from("folders").delete().eq("id", id);

  if (error) {
    console.error(error);
  }

  return data;
}
