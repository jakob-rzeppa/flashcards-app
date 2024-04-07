import { createClient } from "@/utils/supabase/server";
import getUserId from "./getUserId";

async function getMasteryLevel(cardIds: number[]) {
  const supabase = createClient();

  const userId = await getUserId();

  if (!userId) {
    console.error("no user");
    return null;
  }

  const { data, error } = await supabase
    .from("mastery_level")
    .select("*")
    .eq("card_id", cardIds)
    .eq("user_id", userId);

  if (!data || error) {
    console.error("mastery_level", error);
    return null;
  }

  return data;
}

export default getMasteryLevel;
