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
  currentBox: number
) {
  const supabase = createClient();

  const user = await supabase.auth.getUser();

  if (user.error) {
    console.error("No User");
    return [];
  }

  const userId = user.data.user!.id;

  let zerothBoxMax = 0;
  let firstBoxMax = 0;
  let secoundBoxMax = 0;
  let thirdBoxMax = 0;

  let zerothBox = 0;
  let firstBox = 0;
  let secoundBox = 0;
  let thirdBox = 0;

  switch (currentBox) {
    case 0:
      zerothBoxMax = 20;
      firstBoxMax = 5;
      secoundBoxMax = 3;
      thirdBoxMax = 1;
      break;
    case 1:
      firstBoxMax = 20;
      secoundBoxMax = 5;
      thirdBoxMax = 3;
      break;
    case 2:
      secoundBoxMax = 20;
      thirdBoxMax = 5;
      break;
    case 3:
      thirdBoxMax = 20;
      break;
  }

  const cards: {
    created_at: string;
    definition: string;
    id: number;
    owner_id: string;
    stack_id: number;
    word: string;
  }[] = [];

  for (let i = 0; i < allCards.length; i++) {
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

    switch (level) {
      case 0:
        if (zerothBox < zerothBoxMax) {
          cards.push(allCards[i]);
          zerothBox++;
        }
        break;
      case 1:
        if (firstBox < firstBoxMax) {
          cards.push(allCards[i]);
          firstBox++;
        }
        break;
      case 2:
        if (secoundBox < secoundBoxMax) {
          cards.push(allCards[i]);
          secoundBox++;
        }
        break;
      case 3:
        if (thirdBox < thirdBoxMax) {
          cards.push(allCards[i]);
          thirdBox++;
        }
        break;
    }
  }

  return cards;
}
