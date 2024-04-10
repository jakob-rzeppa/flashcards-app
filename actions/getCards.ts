import { createClient } from "@/utils/supabase/server";
import getUserId from "./getUserId";

async function getCards(stackId: number) {
  const supabase = createClient();

  const userId = await getUserId();

  if (!userId) {
    console.error("no user");
    return null;
  }

  // Cards
  const { data, error } = await supabase
    .from("cards")
    .select("*")
    .eq("stack_id", stackId)
    .order("created_at");

  if (error) {
    console.error("getCards", error);
    return null;
  }

  return data;
}

export default getCards;
