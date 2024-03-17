"use client";

import React from "react";

import List from "@/components/List";

function Library() {
  // TODO Delete course (Only in the course not this page)

  const courses = [
    {
      title: "test",
      href: "/library/test",
      descriptions: { Sets: 4, Folders: 2, Cards: 243 },
    },
  ];

  return <List title="Courses" list={courses} />;
}

export default Library;
