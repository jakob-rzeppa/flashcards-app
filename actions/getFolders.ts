import { createClient } from "@/utils/supabase/server";

async function getFolders(courseId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("folders")
    .select("*")
    .eq("course_id", courseId);

  if (!data || error) {
    console.error("getFolders", error);
    return null;
  }

  const stacks = await supabase
    .from("stacks")
    .select("id")
    .eq("folder_id", data);

  // Num Of Stacks In Folder
  const numOfStacks: number[] = [];

  for (let i = 0; i < data.length; i++) {
    const stacksInFolder = await supabase
      .from("stacks")
      .select("id")
      .eq("folder_id", data[i].id)
      .order("created_at");

    if (!stacksInFolder.data || stacksInFolder.error) {
      console.error("stacksInFolder", stacksInFolder.error);
      numOfStacks[i] = 0;
    } else {
      numOfStacks[i] = stacksInFolder.data!.length;
    }
  }

  return { data, numOfStacks };
}

export default getFolders;
