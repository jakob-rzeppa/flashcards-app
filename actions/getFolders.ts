import { createClient } from "@/utils/supabase/server";
import React from "react";

async function getFolders(courseId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("folders")
    .select("*")
    .eq("course_id", courseId);

  if (!data || error) {
    console.error(error);
    return null;
  }

  return data;
}

export default getFolders;
