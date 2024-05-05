import { createClient } from "@/utils/supabase/server";

export default async function getFolderCards(id: number) {
  const supabase = createClient();

  const stackIds = await supabase
    .from("stacks")
    .select("id")
    .eq("folder_id", id);

  if (stackIds.error || !stackIds.data) {
    console.log(stackIds.error);
    return [];
  }

  const cards = await supabase
    .from("cards")
    .select("*")
    .in(
      "stack_id",
      stackIds.data.map((e) => e.id)
    );

  if (cards.error) {
    console.error(cards.error);
    return [];
  }

  return cards.data;
}
