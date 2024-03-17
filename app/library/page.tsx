"use client";

import React from "react";

import Button from "@/components/Button";
import ListItem from "@/components/ListItem";

function Library() {
  // New Course Button
  // List of Courses
  // Course Functionality (link)
  // Order => most used, alphabeticly, date created, date last used
  // Delete course (Only in the course not this page)
  return (
    <div className="w-full max-w-xl bg-white p-8 rounded shadow-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Courses</h1>
      <Button onClick={() => {}}>Create New Course</Button>
      <ul className="mt-2">
        <ListItem
          title="test"
          href="/library/test"
          descriptions={{ Sets: 3, Cards: 42 }}
        ></ListItem>
      </ul>
    </div>
  );
}

export default Library;
