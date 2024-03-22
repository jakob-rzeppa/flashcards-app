"use client";

import React, { useState } from "react";

import Course from "./course";
import { createClient } from "@/utils/supabase/client";

function LibraryPage() {
  const supabase = createClient();

  const [courses, setCourses] = useState<
    {
      created_at: string;
      description: string | null;
      id: number;
      image_url: string | null;
      name: string;
      owner_id: string;
    }[]
  >();

  const getCourses = async () => {
    const user = await supabase.auth.getUser();

    const userId = user.data.user!.id;

    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("owner_id", userId);

    if (error) {
      throw error;
    } else {
      setCourses(data);
    }
  };

  getCourses();

  return (
    <div className="flex flex-col justify-center items-center gap-8 mt-8">
      <div className="flex gap-4 w-full max-w-6xl justify-center flex-wrap">
        <button className="btn btn-primary sm:w-1/5 w-full">
          Learn all Cards
        </button>
        <button className="btn btn-primary sm:w-1/5 w-full">Button</button>
        <button className="btn btn-primary sm:w-1/5 w-full">Button</button>
        <button className="btn btn-primary sm:w-1/5 w-full">Button</button>
      </div>
      <h2 className="text-3xl">Courses</h2>
      <div className="flex flex-row gap-4">
        {courses ? (
          courses.map((course) => <Course data={course} key={course.id} />)
        ) : (
          <p>Loading Courses...</p>
        )}
      </div>
    </div>
  );
}

export default LibraryPage;
