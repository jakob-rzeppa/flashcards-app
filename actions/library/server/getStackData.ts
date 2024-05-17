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
    return { data: null, cards: [], tags: [] };
  }

  if (stacks.data.length === 0) {
    console.error("StackId not found!");
    return { data: null, cards: [], tags: [] };
  }

  if (cards.error) {
    console.error(cards.error);
    return { data: stacks.data[0], cards: [], tags: [] };
  }

  const tags = await supabase
    .from("stack_tags")
    .select("*")
    .in(
      "stack_id",
      stacks.data.map((stack) => stack.id)
    );

  if (tags.error) {
    console.error(tags.error);
    return { data: stacks.data[0], cards: cards.data, tags: [] };
  }

  return { data: stacks.data[0], cards: cards.data, tags: tags.data };
}
