import React, { Suspense } from "react";

import getCourses from "@/actions/getCourses";

import Course from "./Course";
import Button from "../Button";

async function CourseList() {
  const courses = await getCourses();

  return (
    <div className="w-4/5 flex flex-wrap justify-between items-center gap-4">
      <Suspense fallback={<div>Loading...</div>}>
        {courses?.data?.map((course, index) => (
          <div className="carousel-item" key={course.id}>
            <Course data={course} numOfFolders={courses.numOfFolders[index]} />
          </div>
        ))}
        {courses?.data === null && <div>No Courses</div>}
      </Suspense>
    </div>
  );
}

export default CourseList;
