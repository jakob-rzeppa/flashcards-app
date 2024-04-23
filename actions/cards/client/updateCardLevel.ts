import { createClient } from "@/utils/supabase/client";

export async function updateCardLevel(id: number, level: number) {
  if (level < 0 || level > 3) {
    console.log("Level not changed");
    return;
  }

  const supabase = createClient();

  const user = await supabase.auth.getUser();
  if (user.error || !user.data.user) {
    console.error("no user");
    return;
  }

  const userId = user.data.user.id;

  const { data, error } = await supabase
    .from("card_level")
    .update({ level: level })
    .eq("card_id", id)
    .eq("user_id", userId);

  if (error) {
    console.error(error);
    return;
  }

  console.log("Level changed to " + level);
}
