import { createClient } from "@/utils/supabase/client";

async function deleteCard(cardId: number) {
  const supabase = createClient();

  const { error } = await supabase.from("cards").delete().eq("id", cardId);

  if (error) {
    console.error("deleteCards", error);
  }
}

export default deleteCard;
