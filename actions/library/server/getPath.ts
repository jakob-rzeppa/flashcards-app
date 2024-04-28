import { createClient } from "@/utils/supabase/server";

export default async function getPath(
  element: "stack" | "folder" | "course",
  id: number
) {
  const supabase = createClient();

  const path: { name: string; href?: string }[] = [
    { name: "Library", href: "/library/" },
  ];

  if (element === "course") {
    const { data: courseData, error: courseError } = await supabase
      .from("courses")
      .select("*")
      .eq("id", id);

    if (courseError || !courseData) {
      console.error("Couldnt fetch course");
      return [];
    }

    path.push({ name: courseData[0].name });
    return path;
  }

  if (element === "folder") {
    const { data: folderData, error: folderError } = await supabase
      .from("folders")
      .select("*")
      .eq("id", id);

    if (folderError || !folderData) {
      console.error("Couldnt fetch folder");
      return [];
    }

    const { data: courseData, error: courseError } = await supabase
      .from("courses")
      .select("*")
      .eq("id", folderData[0].id);

    if (courseError || !courseData) {
      console.error("Couldnt fetch course");
      return [];
    }

    path.push({
      name: courseData[0].name,
      href: "/library/course?id=" + courseData[0].id,
    });

    path.push({
      name: folderData[0].name,
    });

    return path;
  }

  if (element === "stack") {
    const { data: stackData, error: stackError } = await supabase
      .from("stacks")
      .select("*")
      .eq("id", id);

    if (stackError || !stackData) {
      console.error("Couldnt fetch folder");
      return [];
    }

    const { data: folderData, error: folderError } = await supabase
      .from("folders")
      .select("*")
      .eq("id", stackData[0].id);

    if (folderError || !folderData) {
      console.error("Couldnt fetch folder");
      return [];
    }

    const { data: courseData, error: courseError } = await supabase
      .from("courses")
      .select("*")
      .eq("id", folderData[0].id);

    if (courseError || !courseData) {
      console.error("Couldnt fetch course");
      return [];
    }

    path.push({
      name: courseData[0].name,
      href: "/library/course?id=" + courseData[0].id,
    });

    path.push({
      name: folderData[0].name,
      href: "/library/folder?id=" + folderData[0].id,
    });

    path.push({
      name: stackData[0].name,
    });

    return path;
  }
}
