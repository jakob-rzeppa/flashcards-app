import { createClient } from "@/utils/supabase/client";

export default async function updateStack(
  id: number,
  data: { name: string; description: string }
) {
  const supabase = createClient();

  const res = await supabase.from("stacks").update(data).eq("id", id);

  if (res.error) {
    console.error(res.error);
    return false;
  }

  console.log("Updated Stack", res.data);
  return true;
}
