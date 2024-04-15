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
    return { data: null, folders: null };
  }

  if (course.data.length === 0) {
    console.error("CourseId not found!");
    return { data: null, folders: null };
  }

  if (folders.error) {
    console.error(folders.error);
    return { data: course.data[0], folders: null };
  }

  return { data: course.data[0], folders: folders.data };
}
