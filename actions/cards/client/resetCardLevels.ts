import { typeCards } from "@/types";
import { createClient } from "@/utils/supabase/client";

// TODO delete or rebuild with new learn algorithm
export default async function resetCardLevels(cards: typeCards) {
  const supabase = createClient();

  const user = await supabase.auth.getUser();

  if (user.error || !user.data.user) {
    console.error("no user");
    return;
  }

  const userId = user.data.user.id;

  const { data, error } = await supabase
    .from("card_levels")
    .update({ level: 0 })
    .in(
      "card_id",
      cards.map((card) => card.id)
    )
    .eq("user_id", userId);

  if (error) {
    console.error(error);
    return;
  }

  console.log("Finished resetting selected cards");
}
