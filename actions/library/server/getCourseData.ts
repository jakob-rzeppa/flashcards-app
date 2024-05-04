import { createClient } from "@/utils/supabase/server";

export async function getCourseData(id: number) {
  const supabase = createClient();

  const course = await supabase.from("courses").select("*").eq("id", id);

  const folders = await supabase
    .from("folders")
    .select("*")
    .eq("course_id", id);

  if (course.error) {
    console.error(course.error);
    return null;
  }

  if (course.data.length === 0) {
    console.error("CourseId not found!");
    return null;
  }

  if (folders.error) {
    console.error(folders.error);
    return null;
  }

  const numOfStacks: number[] = [];

  for (let i = 0; i < folders.data.length; i++) {
    const stacksInFolder = await supabase
      .from("stacks")
      .select("id")
      .eq("folder_id", folders.data[i].id);

    if (!stacksInFolder.data || stacksInFolder.error) {
      console.error("stacksInFolder", stacksInFolder.error);
      numOfStacks[i] = 0;
    } else {
      numOfStacks[i] = stacksInFolder.data!.length;
    }
  }

  return { data: course.data[0], folders: folders.data, numOfStacks };
}
