"use client";

import React, { useState } from "react";
import { createClient } from "@/utils/supabase/client";

interface Props {
  params: { courseId: string };
}

function CoursePage({ params: { courseId } }: Props) {
  const supabase = createClient();

  const [folders, setFolders] = useState<
    {
      course_id: number;
      created_at: string;
      id: number;
      name: string;
      owner_id: string;
    }[]
  >();

  const [courseName, setCourseName] = useState("");

  const getData = async () => {
    {
      const { data, error } = await supabase
        .from("folders")
        .select("*")
        .eq("course_id", courseId);

      if (error) {
        throw error;
      } else {
        setFolders(data);
      }
    }
    {
      const { data, error } = await supabase
        .from("courses")
        .select("name")
        .eq("id", courseId);

      if (error) {
        throw error;
      } else {
        setCourseName(data[0].name);
      }
    }
  };

  getData();

  return (
    <div className="flex flex-col gap-8 justify-center items-center mt-8">
      <h1 className="text-4xl font-bold">{courseName}</h1>
    </div>
  );
}

export default CoursePage;
