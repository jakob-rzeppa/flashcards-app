import React, { Suspense } from "react";

import getCourses from "@/actions/getCourses";

import LibraryList from "../../../components/library/LibraryList";

async function CourseList() {
  const courses = await getCourses();

  const data: {
    href: string;
    name: string;
    description: string | null;
    badgeText: string;
  }[] = courses!.data.map((course, index) => ({
    href: "/library/course?id=" + course.id,
    name: course.name,
    description: course.description,
    badgeText: "Folders: " + courses?.numOfFolders[index],
  }));

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LibraryList data={data} />
    </Suspense>
  );
}

export default CourseList;
