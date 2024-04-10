import { createClient } from "@/utils/supabase/client";

async function updateCard(cardId: number, word: string, definition: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("cards")
    .update({ word: word, definition: definition })
    .eq("id", cardId)
    .select();

  if (error) {
    throw error;
  }

  console.log("Sucessfully updated", { cardId, word, definition });
}

export default updateCard;
