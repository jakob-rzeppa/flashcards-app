import { createClient } from "@/utils/supabase/server";

export async function getCards(scope: "stack", stackId: number) {
  const supabase = createClient();

  const cards = await supabase
    .from("cards")
    .select("*")
    .eq("stack_id", stackId);

  if (cards.error) {
    console.error(cards.error);
    return [];
  }

  return cards.data;
}
