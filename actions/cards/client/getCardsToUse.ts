import { createClient } from "@/utils/supabase/client";

export async function getCardsToUse(
  allCards: {
    created_at: string;
    definition: string;
    id: number;
    owner_id: string;
    stack_id: number;
    word: string;
  }[],
  box: number,
  number: number
) {
  const supabase = createClient();

  const user = await supabase.auth.getUser();

  if (user.error) {
    console.error("No User");
    return [];
  }

  const userId = user.data.user!.id;

  const cards: {
    created_at: string;
    definition: string;
    id: number;
    owner_id: string;
    stack_id: number;
    word: string;
  }[] = [];

  let counter = 0;

  for (let i = 0; i < allCards.length && counter < number; i++) {
    const levelData = await supabase
      .from("card_level")
      .select("*")
      .eq("card_id", allCards[i].id)
      .eq("user_id", userId);

    if (levelData.error || levelData.data.length !== 1) {
      const { data, error } = await supabase
        .from("card_level")
        .insert([{ card_id: allCards[i].id }]);

      if (error) {
        console.error("Couldnt create card");
        return [];
      }
      console.log("created new level entry");
    }

    const level = levelData.data ? levelData.data[0].level : 0;

    if (level === box) {
      cards.push(allCards[i]);
      counter++;
    }
  }

  return cards;
}
