"use client";

import React, { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Folder from "./folder";
import { useRouter } from "next/navigation";

interface Props {
  params: { courseId: string };
}

function CoursePage({ params: { courseId } }: Props) {
  const router = useRouter();
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
    const user = await supabase.auth.getUser();
    if (!user.data.user) {
      router.push("/login");
      return;
    }

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
      <div className="flex flex-wrap gap-4 w-4/5 max-w-6xl justify-center">
        <button className="btn btn-primary sm:w-1/5 w-full">
          Learn all Cards
        </button>
        <button className="btn btn-primary sm:w-1/5 w-full">Button</button>
        <button className="btn btn-primary sm:w-1/5 w-full">Button</button>
        <button className="btn btn-primary sm:w-1/5 w-full">Button</button>
      </div>
      <div className="flex flex-row gap-4 w-4/5">
        {folders?.map((data) => (
          <Folder data={data} key={data.id} />
        ))}
      </div>
    </div>
  );
}

export default CoursePage;
