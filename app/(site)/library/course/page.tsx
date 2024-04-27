import React from "react";

import NavButton from "@/components/navigation/NavButton";
import { getCourseData } from "@/actions/library/server/getCourseData";
import LibraryList from "@/components/library/LibraryList";
import NewElement from "@/components/library/NewElement";
import CourseSettings from "./CourseSettings";
import BackgroundBox from "@/components/BackgroundBox";
import Link from "next/link";

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
    <div className="mt-8 relative">
      <NavButton href={`/library/`} className="absolute top-0 left-8" />
      <CourseSettings data={data!} />
      <h1 className="text-4xl font-bold w-full text-center mb-4">
        {data!.name}
      </h1>
      <h2 className="text-xl font-bold w-full text-center mb-4">
        {data!.description}
      </h2>
      <BackgroundBox>
        <Link
          href={"/learn?scope=course&id=" + data?.id}
          className="btn btn-primary w-full"
        >
          Learn all
        </Link>
        <LibraryList data={foldersDisplay} />
        <NewElement type="folder" id={parseInt(id)} />
      </BackgroundBox>
    </div>
  );
}

export default CoursePage;
