import { createClient } from "@/utils/supabase/client";

async function createCard(stackId: number, word: string, definition: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("cards")
    .insert([{ word: word, definition: definition, stack_id: stackId }])
    .select();

  if (error) {
    console.error("createCard", error);
    return;
  }

  console.log(data);
  return data;
}

export default createCard;
