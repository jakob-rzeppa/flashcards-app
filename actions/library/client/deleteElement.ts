import { createClient } from "@/utils/supabase/client";

export async function deleteElement(
  table: "courses" | "folders" | "stacks",
  id: number
) {
  const supabase = createClient();

  const { data, error } = await supabase.from(table).delete().eq("id", id);

  if (error) {
    console.error(error);
  }
}
