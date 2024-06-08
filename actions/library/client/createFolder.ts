import { createClient } from "@/utils/supabase/client";

async function createFolder(name: string, parentFolderId: number | null) {
  const supabase = createClient();

  const insertData = { name, parent_folder: parentFolderId };

  console.log(insertData);

  const { data, error } = await supabase
    .from("folders")
    .insert(insertData)
    .select();

  if (error) {
    console.error("createFolder", error);
    return;
  }

  console.log(data);
}

export default createFolder;
