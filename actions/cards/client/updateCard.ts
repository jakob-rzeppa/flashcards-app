import { createClient } from "@/utils/supabase/client";

async function updateCard(cardId: number, front: string, back: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("cards")
    .update({ front: front, back: back })
    .eq("id", cardId)
    .select();

  if (error) {
    throw error;
  }

  console.log("Sucessfully updated", { cardId, front, back });
}

export default updateCard;
