import { createClient } from "@/utils/supabase/client";

export default async function removeTag(tag: string, stack_id: number) {
  const supabase = createClient();

  const newStackTag = await supabase
    .from("stack_tags")
    .delete()
    .eq("stack_id", stack_id)
    .eq("tag", tag);

  if (newStackTag.error) {
    console.error(newStackTag.error);
    return;
  }

  console.log(
    "Succesfully removed the tag " + tag + " from the stack " + stack_id
  );

  // check if tag isn't used anymore
  if (
    (await supabase.from("stack_tags").select("*").eq("tag", tag)).data
      ?.length === 0
  ) {
    await supabase.from("tags").delete().eq("name", tag);

    console.log("Succesfully deleted unused tag " + tag);
  }
}
