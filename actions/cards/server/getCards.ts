import { createClient } from "@/utils/supabase/server";

export async function getCards(
  scope: "stack" | "folder" | "course" | "library",
  parentId?: number
) {
  const supabase = createClient();

  const user = await supabase.auth.getUser();

  if (user.error) {
    console.error("No User");
    return [];
  }

  const userId = user.data.user!.id;

  switch (scope) {
    case "stack":
      if (!parentId) {
        console.error("no stackId");
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
    // TODO other scopes
    default:
      return [];
  }
}
