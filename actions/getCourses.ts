import { createClient } from "@/utils/supabase/server";
import getUserId from "./getUserId";

async function getCourses() {
  const supabase = createClient();

  const userId = await getUserId();

  if (!userId) {
    console.log("no user");
    return null;
  }

  // Data of Courses
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("owner_id", userId);

  if (error) {
    console.error("getCourses", error);
    return null;
  }

  // Num Of Folders In Course
  const numOfFolders: number[] = [];

  for (let i = 0; i < data.length; i++) {
    const foldersInCourse = await supabase
      .from("folders")
      .select("id")
      .eq("course_id", data[i].id)
      .order("created_at");

    if (!foldersInCourse.data || foldersInCourse.error) {
      console.error("foldersInCourse", foldersInCourse.error);
      numOfFolders[i] = 0;
    } else {
      numOfFolders[i] = foldersInCourse.data!.length;
    }
  }

  return { data, numOfFolders };
}

export default getCourses;
