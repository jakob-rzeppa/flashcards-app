import { createClient } from "@/utils/supabase/server";

export async function getCards(
  scope: "stack" | "folder" | "course" | "library",
  parentId?: number
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
    if (!parentId) {
      console.error("can't get cards, because no stackId supplied");
      return [];
    }
    const cards = await supabase
      .from("cards")
      .select("*")
      .eq("stack_id", parentId!);

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
  }

  // TODO other scopes
  return [];
}
