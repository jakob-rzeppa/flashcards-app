import { createClient } from "@/utils/supabase/client";

export default async function updateElement(
  table: "courses" | "folders" | "stacks",
  id: number,
  data: { name: string; description: string }
) {
  const supabase = createClient();

  const res = await supabase.from(table).update(data).eq("id", id);

  if (res.error) {
    console.error(res.error);
    return false;
  }

  console.log("Updated element", res.data);
  return true;
}
