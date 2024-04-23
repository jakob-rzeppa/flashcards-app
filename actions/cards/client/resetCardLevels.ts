import { createClient } from "@/utils/supabase/client";

export default async function resetCardLevels(
  cards: {
    created_at: string;
    definition: string;
    id: number;
    owner_id: string;
    stack_id: number;
    word: string;
  }[]
) {
  const supabase = createClient();

  const user = await supabase.auth.getUser();

  if (user.error || !user.data.user) {
    console.error("no user");
    return;
  }

  const userId = user.data.user.id;

  const { data, error } = await supabase
    .from("card_level")
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