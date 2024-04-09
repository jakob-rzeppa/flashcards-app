import { createClient } from "@/utils/supabase/client";

async function updateCards(
  cards: { id: number; word: string; definition: string }[],
  stackId: number
) {
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  if (!user.data.user || user.error) {
    console.log("user", user.error);
    return null;
  }

  const userId = user.data.user.id;

  // IDEA I could create a update card modal, that opens from the learn and edit page and instantly inserts into the database. Inserts could be handled in the edit page and uploaded when page closes or on save button.
}

export default updateCards;
