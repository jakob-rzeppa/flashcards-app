import { typeStack } from "@/types";
import { createClient } from "@/utils/supabase/server";

export default async function getTags(stacks: typeStack[]) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("stack_tags")
    .select("*")
    .in(
      "stack_id",
      stacks.map((stack) => stack.id)
    );

  if (error) {
    console.error(error);
    return new Map<number, string[]>();
  }

  const dataMap = new Map<number, string[]>();

  data.forEach((e) => {
    if (!dataMap.has(e.stack_id)) dataMap.set(e.stack_id, [e.tag]);
    else dataMap.get(e.stack_id)?.push(e.tag);
  });

  return dataMap;
}
