import { createClient } from "@/utils/supabase/client";
import getUserId from "./getUserId";

/*
{
  created_at: string;
  description: string | null;
  id: number;
  image_url: string | null;
  name: string;
  owner_id: string;
}[]
*/

async function getCourses() {
  const supabase = createClient();

  const userId = getUserId();

  // Data of Courses
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("owner_id", userId);

  if (error) {
    return null;
  }

  // Num Of Folders In Course
  const numOfFolders = [data.length];

  for (let i = 0; i < data.length; i++) {
    const foldersInCourse = await supabase
      .from("folders")
      .select("id")
      .eq("course_id", data[i].id);

    if (!foldersInCourse) {
      numOfFolders[i] = 0;
    } else {
      numOfFolders[i] = (await Promise.all([foldersInCourse])).length;
    }
  }

  return { data, numOfFolders };
}

export default getCourses;
