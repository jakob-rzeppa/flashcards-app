import { createClient } from "@/utils/supabase/server";

export async function getFolderData(id: number) {
  const supabase = createClient();

  const folder = await supabase.from("folders").select("*").eq("id", id);

  const stacks = await supabase.from("stacks").select("*").eq("folder_id", id);

  if (folder.error) {
    console.error(folder.error);
    return null;
  }

  if (folder.data.length === 0) {
    console.error("FolderId not found!");
    return null;
  }

  if (stacks.error) {
    console.error(stacks.error);
    return null;
  }

  const numOfCards: number[] = [];

  for (let i = 0; i < stacks.data.length; i++) {
    const cardsInStack = await supabase
      .from("cards")
      .select("id")
      .eq("stack_id", stacks.data[i].id);

    if (!cardsInStack.data || cardsInStack.error) {
      console.error("cardsInStack", cardsInStack.error);
      numOfCards[i] = 0;
    } else {
      numOfCards[i] = cardsInStack.data!.length;
    }
  }

  return { data: folder.data[0], stacks: stacks.data, numOfCards };
}
