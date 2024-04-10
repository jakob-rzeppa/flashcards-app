import { createClient } from "@/utils/supabase/client";

async function updateCard(
  stackId: number,
  cardId: number,
  word: string,
  definition: string
) {
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  if (!user.data.user || user.error) {
    console.log("user", user.error);
    return null;
  }

  const userId = user.data.user.id;

  console.log({ stackId, cardId, word, definition });
}

export default updateCard;
