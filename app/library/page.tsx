"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

import CourseList from "@/components/CourseList";

function LibraryPage() {
  const router = useRouter();
  const supabase = createClient();

  const [coursess, setCourses] = useState<
    {
      created_at: string;
      description: string | null;
      id: number;
      image_url: string | null;
      name: string;
      owner_id: string;
    }[]
  >();

  const [numOfFoldersPerCourse, setNumOfFoldersPerCourse] = useState<number[]>(
    []
  );

  const getNumOfFolders = async (courseId: number) => {
    const foldersInCourse = await supabase
      .from("folders")
      .select("id")
      .eq("course_id", courseId);

    if (!foldersInCourse.data) {
      return 0;
    }

    numOfFoldersPerCourse.push(foldersInCourse.data.length);
  };

  if (courses)
    courses.forEach((course) => {
      getNumOfFolders(course.id);
    });

  return (
    <div className="flex flex-col justify-center items-center gap-8 mt-8">
      <div className="grid grid-cols-1 grid-rows-4 sm:grid-cols-4 sm:grid-rows-1 w-4/5 max-w-6xl ">
        <button className="btn btn-primary m-2">Learn all Cards</button>
        <button className="btn btn-primary m-2">Button</button>
        <button className="btn btn-primary m-2">Button</button>
        <button className="btn btn-primary m-2">Button</button>
      </div>
      <h2 className="text-3xl">Courses</h2>
      <CourseList />
    </div>
  );
}

export default LibraryPage;
