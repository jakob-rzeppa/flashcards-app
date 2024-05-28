import { createClient } from "@/utils/supabase/server";

export async function getStackData(id: number) {
  const supabase = createClient();

  const stacks = await supabase.from("stacks").select("*").eq("id", id);

  const cards = await supabase
    .from("cards")
    .select("*")
    .eq("stack_id", id)
    .order("created_at", { ascending: true });

  if (stacks.error) {
    console.error(stacks.error);
    return { data: null, cards: [] };
  }

  if (stacks.data.length === 0) {
    console.error("StackId not found!");
    return { data: null, cards: [] };
  }

  if (cards.error) {
    console.error(cards.error);
    return { data: stacks.data[0], cards: [] };
  }

  return { data: stacks.data[0], cards: cards.data };
}
