import { createClient } from "@/utils/supabase/client";

async function createCard(stackId: number, front: string, back: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("cards")
    .insert([{ front: front, back: back, stack_id: stackId }])
    .select();

  if (error) {
    console.error("createCard", error);
    return;
  }

  console.log(data);
  return data;
}

export default createCard;
