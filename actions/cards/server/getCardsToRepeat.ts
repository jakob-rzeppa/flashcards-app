import { typeCards } from "@/types";
import { createClient } from "@/utils/supabase/server";

export default async function getCardsToRepeat(cards: typeCards) {
  const supabase = createClient();

  const user = await supabase.auth.getUser();

  if (user.error) {
    console.error("No User");
    return [];
  }

  const userId = user.data.user!.id;

  const cardLevels = await supabase
    .from("card_levels")
    .select("*")
    .in(
      "card_id",
      cards.map((card) => card.id)
    )
    .eq("user_id", userId);

  if (cardLevels.error) {
    console.error(cardLevels.error);
    return [];
  }

  const filteredCards = cards.filter((card) => {
    const cardLevel = cardLevels.data.find((e) => e.card_id === card.id);
    if (!cardLevel) {
      return true;
    } else {
      const lastChanged = new Date(cardLevel.last_changed);
      const timePassed = Date.now() - lastChanged.getTime();

      // Convert milliseconds to seconds, minutes, hours, and days
      const seconds = Math.floor(timePassed / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24) + 1;

      return 2 ** (cardLevel.level - 1) <= days;
    }
  });

  return filteredCards;
}
