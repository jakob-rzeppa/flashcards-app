import React from "react";

import getLibraryData from "@/actions/library/server/getLibraryData";
import LibraryList from "@/components/library/LibraryList";
import NewElement from "@/components/library/NewElement";
import BackgroundBox from "@/components/BackgroundBox";
import Link from "next/link";
import ProgressDisplay from "@/components/library/ProgressDisplay";

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
      <BackgroundBox>
        <ProgressDisplay scope="library" />
        <Link
          href="/learn?scope=library&method=shortTermMemory"
          className="btn btn-primary w-full"
        >
          Learn all
        </Link>
        <LibraryList data={data} />
        <NewElement type="course" />
      </BackgroundBox>
    </div>
  );
}

export default LibraryPage;
