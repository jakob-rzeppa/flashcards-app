"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Course from "./course";
import { createClient } from "@/utils/supabase/client";

function LibraryPage() {
  const router = useRouter();
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

    if (!user.data.user) {
      router.push("/login");
      return;
    }

    const userId = user.data.user.id;

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

  const [newCourseTitle, setNewCourseTitle] = useState("");
  const [newCourseDescription, setNewCourseDescription] = useState("");

  const handleCreateCourse = () => {
    console.log(newCourseTitle);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-8 mt-8">
      <div className="flex gap-4 w-full max-w-6xl justify-center flex-wrap">
        <button className="btn btn-primary flex-1">Learn all Cards</button>
        <button className="btn btn-primary flex-1">Button</button>
        <button className="btn btn-primary flex-1">Button</button>
        <button className="btn btn-primary flex-1">Button</button>
      </div>
      <h2 className="text-3xl">Courses</h2>
      <div className="w-4/5 carousel space-x-4 items-center">
        {courses ? (
          courses.map((course, index) => (
            <div className="carousel-item" key={course.id}>
              <Course
                data={course}
                numOfFolders={numOfFoldersPerCourse[index]}
              />
            </div>
          ))
        ) : (
          <p>Loading Courses...</p>
        )}
        <button
          className="btn btn-primary"
          onClick={() =>
            (
              document.getElementById("create_course_modal") as HTMLFormElement
            ).showModal()
          }
        >
          Create a new Course
        </button>
        <dialog id="create_course_modal" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">Create a Course</h3>
            <input
              type="text"
              className="input input-primary mt-4"
              placeholder="title"
              onChange={(event) => setNewCourseTitle(event.target.value)}
            />
            <br />
            <input
              type="text"
              className="input input-primary mt-2"
              placeholder="description"
              onChange={(event) => setNewCourseDescription(event.target.value)}
            />
            <br />
            <button
              className="btn btn-primary mt-4"
              onClick={handleCreateCourse}
            >
              Create
            </button>
          </div>
        </dialog>
      </div>
    </div>
  );
}

export default LibraryPage;
