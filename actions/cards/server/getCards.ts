import { createClient } from "@/utils/supabase/server";
import { error } from "console";

export async function getCards(
  scope: "stack" | "folder" | "course" | "library",
  id?: number
): Promise<
  {
    created_at: string;
    definition: string;
    id: number;
    owner_id: string;
    stack_id: number;
    word: string;
  }[]
> {
  const supabase = createClient();

  const user = await supabase.auth.getUser();

  if (user.error) {
    console.error("No User");
    return [];
  }

  const userId = user.data.user!.id;

  if (scope === "stack") {
    if (!id) {
      console.error("can't get cards, because no stackId supplied");
      return [];
    }
    const cards = await supabase.from("cards").select("*").eq("stack_id", id!);

    if (cards.error) {
      console.error(cards.error);
      return [];
    }

    return cards.data;
  } else if (scope === "library") {
    const cards = await supabase
      .from("cards")
      .select("*")
      .eq("owner_id", userId);

    if (cards.error) {
      console.error(cards.error);
      return [];
    }

    return cards.data;
  } else if (scope === "folder") {
    if (!id) {
      console.error("can't get cards, because no folderId supplied");
      return [];
    }

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

  // TODO other scopes
  return [];
}
