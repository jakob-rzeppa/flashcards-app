import { createClient } from "@/utils/supabase/client";

async function createElement(
  type: "course" | "folder" | "stack",
  parentId: number | undefined,
  name: string,
  description: string
) {
  const supabase = createClient();

  const insertData: any =
    type === "course"
      ? { name, description }
      : type === "folder"
      ? { name, description, course_id: parentId }
      : type === "stack"
      ? { name, description, folder_id: parentId }
      : null;

  console.log(insertData);

  const table =
    type === "course" ? "courses" : type === "folder" ? "folders" : "stacks";

  const { data, error } = await supabase
    .from(table)
    .insert(insertData)
    .select();

  if (error) {
    console.error("createElement", error);
    return;
  }

  console.log(data);
}

export default createElement;
