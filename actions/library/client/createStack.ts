import { createClient } from "@/utils/supabase/client";

async function createStack(
  name: string,
  description: string,
  parentFolderId: number | null
) {
  const supabase = createClient();

  const insertData = { name, description, parent_folder: parentFolderId };

  console.log(insertData);

  const { data, error } = await supabase
    .from("stacks")
    .insert(insertData)
    .select();

  if (error) {
    console.error("createStack", error);
    return;
  }

  console.log(data);
}

export default createStack;
