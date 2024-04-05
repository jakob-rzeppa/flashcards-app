import React from "react";

import Course from "./Course";

async function getCourses(userId: string) {}

async function CourseList() {
  const data = await Promise.all([getCourses]);

  return (
    <div className="w-4/5 carousel space-x-4 items-center">
      {courses.map((course, index) => (
        <div className="carousel-item" key={course.id}>
          <Course data={course} numOfFolders={numOfFoldersPerCourse[index]} />
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
