import React from "react";

import getCourses from "@/actions/getCourses";

import NewCourseModal from "@/app/library/newCourseModal";
import Course from "./Course";

async function CourseList() {
  const courses = await getCourses();

  return (
    <div className="w-4/5 carousel space-x-4 items-center">
      {courses?.map((course) => (
        <div className="carousel-item" key={course.id}>
          <Course data={course} />
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
    </div>
  );
}

export default CourseList;
