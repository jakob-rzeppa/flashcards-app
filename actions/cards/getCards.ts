import { createClient } from "@/utils/supabase/client";

export async function getCards() {
  const supabase = createClient();

  const { data, error } = await supabase.from("cards").select("*");

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}
