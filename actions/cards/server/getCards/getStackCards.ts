import { createClient } from "@/utils/supabase/server";

export default async function getStackCards(id: number) {
  const supabase = createClient();

  const cards = await supabase.from("cards").select("*").eq("stack_id", id!);

  if (cards.error) {
    console.error(cards.error);
    return [];
  }

  return cards.data;
}
