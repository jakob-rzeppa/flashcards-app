import { createClient } from "@/utils/supabase/server";

export default async function getCourseCards(id: number) {
  const supabase = createClient();

  const folderIds = await supabase
    .from("folders")
    .select("id")
    .eq("course_id", id);

  if (folderIds.error || !folderIds.data) {
    console.log(folderIds.error);
    return [];
  }

  const stackIds = await supabase
    .from("stacks")
    .select("id")
    .in(
      "folder_id",
      folderIds.data.map((e) => e.id)
    );

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
