import { createClient } from "@/utils/supabase/server";

async function getName(table: "courses" | "folders" | "stacks", id: number) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from(table)
    .select("name")
    .eq("id", id);

  if (error) {
    console.error("getName " + table, error);
    return "Can't find name";
  }

  if (data.length === 0) {
    console.error("getName returns no data", table);
    return "Can't find name";
  }

  return data[0].name;
}

export default getName;
