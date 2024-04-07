import { createClient } from "@/utils/supabase/server";
import getUserId from "./getUserId";

async function getCards(stackId: number) {
  const supabase = createClient();

  const userId = await getUserId();

  if (!userId) {
    console.log("no user");
    return null;
  }

  // Cards
  const { data, error } = await supabase
    .from("cards")
    .select("*")
    .eq("stack_id", stackId);

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

export default getCards;
