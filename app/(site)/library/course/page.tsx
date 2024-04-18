import React from "react";

import NavButton from "@/components/navigation/NavButton";
import { getCourseData } from "@/actions/library/getCourseData";
import LibraryList from "@/components/library/LibraryList";
import NewElement from "@/components/library/NewElement";
import CourseSettings from "./CourseSettings";

interface Props {
  searchParams: { id: string };
}

async function CoursePage({ searchParams: { id } }: Props) {
  //TODO error handling
  const { data, folders, numOfStacks } = await getCourseData(parseInt(id));

  const foldersDisplay: {
    href: string;
    name: string;
    description: string | null;
    badgeText: string;
  }[] = folders!.map((folder, index) => ({
    href: `/library/folder?id=${folder.id}`,
    name: folder.name,
    description: null,
    badgeText: "Stacks: " + numOfStacks![index],
  }));

  return (
    <div className="flex flex-col gap-8 justify-center items-center mt-8 relative">
      <NavButton href={`/library/`} className="absolute top-0 left-8" />
      <CourseSettings id={parseInt(id)} />
      <h1 className="text-4xl font-bold">{data!.name}</h1>
      <LibraryList data={foldersDisplay} />
      <NewElement type="folder" id={parseInt(id)} />
    </div>
  );
}

export default CoursePage;
