import { createClient } from "@/utils/supabase/server";

export async function getStackData(id: number) {
  const supabase = createClient();

  const stack = await supabase.from("stacks").select("*").eq("id", id);

  const cards = await supabase.from("cards").select("*").eq("stack_id", id);

  if (stack.error) {
    console.error(stack.error);
    return { data: null, cards: null };
  }

  if (stack.data.length === 0) {
    console.error("StackId not found!");
    return { data: null, cards: null };
  }

  if (cards.error) {
    console.error(cards.error);
    return { data: stack.data[0], cards: null };
  }

  return { data: stack.data[0], cards: cards.data };
}
