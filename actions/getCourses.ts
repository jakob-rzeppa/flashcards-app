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

async function getCourses(): Promise<
  | {
      created_at: string;
      description: string | null;
      id: number;
      image_url: string | null;
      name: string;
      owner_id: string;
      numOfFolders: number;
    }[]
  | null
> {
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
  for (let i = 0; i < data.length; i++) {
    const foldersInCourse = await supabase
      .from("folders")
      .select("id")
      .eq("course_id", data[i].id);

    if (!foldersInCourse) {
      data[i].numOfFolders = 0;
    } else {
      data[i].numOfFolders = (await Promise.all([foldersInCourse])).length;
    }
  }

  return data;
}

export default getCourses;
