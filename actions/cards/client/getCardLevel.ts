import { createClient } from "@/utils/supabase/client";

export default async function getCardLevel(id: number) {
  const supabase = createClient();

  const user = await supabase.auth.getUser();

  if (user.error) {
    console.error("No User");
    return -1;
  }

  const userId = user.data.user!.id;

  const levelData = await supabase
    .from("card_level")
    .select("*")
    .eq("card_id", id)
    .eq("user_id", userId);

  if (levelData.error || levelData.data.length !== 1) {
    const { data, error } = await supabase
      .from("card_level")
      .insert([{ card_id: id }]);

    if (error) {
      console.error("Couldnt create card");
      return -1;
    }
    console.log("Created new level entry");
  }

  return levelData.data ? levelData.data[0].level : 0;
}
