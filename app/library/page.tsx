import React from "react";

import CourseList from "@/components/library/CourseList";

function LibraryPage() {
  return (
    <div className="flex flex-col justify-center items-center gap-8 mt-8">
      <h2 className="text-3xl">Courses</h2>
      <CourseList />
    </div>
  );
}

export default LibraryPage;
