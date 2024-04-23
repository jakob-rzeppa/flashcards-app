import { createClient } from "@/utils/supabase/server";

async function getLibraryData() {
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  if (!user.data.user || user.error) {
    console.log("user", user.error);
    return null;
  }

  const userId = user.data.user.id;

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
    console.error("getLibraryData", error);
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

export default getLibraryData;
