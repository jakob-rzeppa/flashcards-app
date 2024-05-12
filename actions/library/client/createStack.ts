import { createClient } from "@/utils/supabase/client";

async function createStack(name: string, description: string) {
  const supabase = createClient();

  const insertData = { name, description };

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
