import { createClient } from "@/utils/supabase/server";

export default async function getLibraryCards() {
  const supabase = createClient();

  const user = await supabase.auth.getUser();

  if (user.error) {
    console.error("No User");
    return [];
  }

  const userId = user.data.user!.id;

  const cards = await supabase.from("cards").select("*").eq("owner_id", userId);

  if (cards.error) {
    console.error(cards.error);
    return [];
  }

  return cards.data;
}
