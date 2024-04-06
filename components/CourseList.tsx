import React, { Suspense } from "react";

import getCourses from "@/actions/getCourses";

import NewCourseModal from "@/app/library/newCourseModal";
import Course from "./Course";

async function CourseList() {
  // TODO remove infinite loop
  const courses = await getCourses();

  console.log(courses?.data);

  return (
    <div className="w-4/5 carousel space-x-4 items-center">
      <Suspense>
        {courses?.data?.map((course, index) => (
          <div className="carousel-item" key={course.id}>
            <Course data={course} numOfFolders={courses.numOfFolders[index]} />
          </div>
        ))}
        <button
          className="btn btn-primary carousel-item"
          onClick={() =>
            (
              document.getElementById("create_course_modal") as HTMLFormElement
            ).showModal()
          }
        >
          Create a new Course
        </button>
        <NewCourseModal id="create_course_modal" />
      </Suspense>
    </div>
  );
}

export default CourseList;
