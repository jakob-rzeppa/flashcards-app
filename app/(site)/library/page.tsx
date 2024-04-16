import React from "react";

import getLibraryData from "@/actions/library/getLibraryData";
import LibraryList from "@/components/library/LibraryList";
import NewElement from "@/components/library/NewElement";

async function LibraryPage() {
  // TODO error handling
  const courses = await getLibraryData();

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
    <div className="flex flex-col justify-center items-center gap-8 mt-8">
      <h2 className="text-3xl">Courses</h2>
      <LibraryList data={data} />
      <NewElement type="course" />
    </div>
  );
}

export default LibraryPage;
