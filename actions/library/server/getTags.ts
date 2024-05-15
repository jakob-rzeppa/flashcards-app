import { typeStack } from "@/types";
import { createClient } from "@/utils/supabase/server";

export default async function getTags(stacks: typeStack[]) {
  const supabase = createClient();

  // rls checks for user
  const { data, error } = await supabase.from("stack_tags").select("*");

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}
