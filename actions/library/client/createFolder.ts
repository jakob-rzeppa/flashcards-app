import { createClient } from "@/utils/supabase/client";

async function createFolder(name: string) {
  const supabase = createClient();

  const insertData = { name };

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
