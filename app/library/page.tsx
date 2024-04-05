"use client";

import React from "react";

import CourseList from "@/components/CourseList";

function LibraryPage() {
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
