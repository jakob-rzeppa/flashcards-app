import { createClient } from "@/utils/supabase/server";

export default async function getAllTags() {
  const supabase = createClient();

  const { data, error } = await supabase.from("tags").select("*");

  if (error) {
    console.error(error);
    return [];
  }

  if (!data) {
    return [];
  }

  return data;
}
