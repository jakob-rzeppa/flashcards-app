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
}

export default updateCards;
