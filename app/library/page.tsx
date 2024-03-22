"use client";

import React from "react";

import Course from "./course";

function LibraryPage() {
  return (
    <div className="flex flex-col justify-center items-center gap-8 mt-8">
      <div className="flex gap-4 w-full max-w-6xl justify-center">
        <button className="btn btn-primary w-1/4">Learn all Cards</button>
        <button className="btn btn-primary w-1/4">Button</button>
        <button className="btn btn-primary w-1/4">Button</button>
        <button className="btn btn-primary w-1/4">Button</button>
      </div>
      <h2 className="text-3xl">Courses</h2>
      <div className="flex flex-row gap-4">
        <Course />
        <Course />
      </div>
    </div>
  );
}

export default LibraryPage;
