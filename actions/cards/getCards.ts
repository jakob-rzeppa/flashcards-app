import { createClient } from "@/utils/supabase/server";

export async function getCards() {
  const supabase = createClient();

  const user = await supabase.auth.getUser();

  if (user.error) {
    console.error("No User");
    return [];
  }

  const userId = user.data.user!.id;

  const cards = await supabase.from("cards").select("*");

  if (cards.error) {
    console.error(cards.error);
    return [];
  }

  const cardIdLevel: { cardId: number; level: number }[] = cards.data.map(
    (card) => {
      return { cardId: card.id, level: 0 };
    }
  );

  for (let i = 0; i < cardIdLevel.length; i++) {
    const level = await supabase
      .from("card_level")
      .select("*")
      .eq("card_id", cards.data[i].id)
      .eq("user_id", userId);

    if (level.error || level.data.length !== 1) {
      await supabase.from("card_level").insert([{ card_id: cards.data[i].id }]);
      console.log("created new level entry");
      continue;
    }

    cardIdLevel[i].level = level.data[0].level;
  }

  return cards.data;
}
