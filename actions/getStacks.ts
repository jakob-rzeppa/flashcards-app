import { createClient } from "@/utils/supabase/server";

async function getFolders(folderId: number) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("stacks")
    .select("*")
    .eq("folder_id", folderId);

  if (!data || error) {
    console.error(error);
    return null;
  }

  // Num Of Stacks In Folder
  const numOfCards: number[] = [];

  for (let i = 0; i < data.length; i++) {
    const cardsInStack = await supabase
      .from("cards")
      .select("id")
      .eq("stack_id", data[i].id);

    if (!cardsInStack.data || cardsInStack.error) {
      console.error("getStacks", cardsInStack.error);
      numOfCards[i] = 0;
    } else {
      numOfCards[i] = cardsInStack.data!.length;
    }
  }

  return { data, numOfCards };
}

export default getFolders;
