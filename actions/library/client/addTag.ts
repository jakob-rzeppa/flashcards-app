import { createClient } from "@/utils/supabase/client";

export default async function addTag(tag: string, stack_id: number) {
  const supabase = createClient();

  // check if tag already exists
  if (
    (await supabase.from("tags").select("*").eq("name", tag)).data?.length === 0
  ) {
    const newTag = await supabase.from("tags").insert({ name: tag }).select();

    if (newTag.error) {
      console.error(newTag.error);
      return false;
    }

    console.log("Succesfully created new tag " + newTag.data[0].name);
  }

  const newStackTag = await supabase
    .from("stack_tags")
    .insert({ stack_id, tag })
    .select();

  if (newStackTag.error) {
    console.error(newStackTag.error);
    return false;
  }

  console.log("Succesfully added the tag " + tag + " to the stack " + stack_id);
  return true;
}
