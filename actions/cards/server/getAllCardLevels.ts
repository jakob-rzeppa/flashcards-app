import { typeCards } from "@/types";
import { createClient } from "@/utils/supabase/server";

// TODO delete or rebuild with new learn algorithm
export async function getAllCardLevels(cards: typeCards) {
  const supabase = createClient();

  const user = await supabase.auth.getUser();

  if (user.error) {
    console.error("No User");
    return { 0: 0, 1: 0, 2: 0, 3: 0 };
  }

  const userId = user.data.user!.id;

  const levels = { 0: 0, 1: 0, 2: 0, 3: 0 };

  for (let i = 0; i < cards.length; i++) {
    const levelData = await supabase
      .from("card_levels")
      .select("*")
      .eq("card_id", cards[i].id)
      .eq("user_id", userId);

    if (levelData.error || levelData.data.length !== 1) {
      const { data, error } = await supabase
        .from("card_levels")
        .insert([{ card_id: cards[i].id }]);

      if (error) {
        console.error("Couldnt create card");
        continue;
      }
      console.log("Created new level entry");
    }

    const level = levelData.data ? levelData.data[0].level : 0;

    switch (level) {
      case 0:
        levels[0]++;
        break;
      case 1:
        levels[1]++;
        break;
      case 2:
        levels[2]++;
        break;
      case 3:
        levels[3]++;
        break;
    }
  }

  return levels;
}
