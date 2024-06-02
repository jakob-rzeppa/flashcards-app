import getCardsToRepeat from "./getCardsToRepeat";
import { createClient } from "@/utils/supabase/server";

export async function getCards(
  method: "shortTermMemory" | "longTermMemory",
  id?: number
) {
  const supabase = createClient();

  const cards = await supabase.from("cards").select("*").eq("stack_id", id!);

  if (cards.error) {
    console.error(cards.error);
    return [];
  }

  // If longTermMemory filter cards by date and level of the card
  return method === "shortTermMemory"
    ? cards.data
    : getCardsToRepeat(cards.data);
}
