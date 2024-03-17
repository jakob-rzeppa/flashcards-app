"use client";

import React, { useState } from "react";

import List from "@/components/List";
import BackgroundBox from "@/components/BackgroundBox";
import Button from "@/components/Button";

function Library() {
  // TODO Delete course (Only in the course not this page)

  const [courses, setCourses] = useState([
    {
      title: "test",
      href: "/library/test",
      descriptions: { Sets: 4, Folders: 2, Cards: 243 },
    },
  ]);

  const addCourse = () => {
    // TODO choose name
  };

  return (
    <BackgroundBox>
      <h1 className="text-2xl font-bold mb-4">Courses</h1>
      <Button onClick={addCourse}>Create New Course</Button>
      <List list={courses} />
    </BackgroundBox>
  );
}

export default Library;
