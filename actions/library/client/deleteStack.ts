import { createClient } from "@/utils/supabase/client";

export async function deleteStack(id: number) {
  const supabase = createClient();

  const { data, error } = await supabase.from("stacks").delete().eq("id", id);

  if (error) {
    console.error(error);
  }
}
