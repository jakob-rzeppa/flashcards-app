import React, { Suspense } from "react";

import getFolders from "@/actions/getFolders";

import LibraryList from "../../../components/library/LibraryList";

interface Props {
  courseId: string;
}

async function FoldersList({ courseId }: Props) {
  const data = await getFolders(courseId);

  const folders: {
    href: string;
    name: string;
    description: string | null;
    badgeText: string;
  }[] = data!.data
    ? data!.data.map((element, index) => ({
        href: "/library/folder?id=" + element.id,
        name: element.name,
        description: null,
        badgeText: "Stacks: " + data!.numOfStacks[index],
      }))
    : [];

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LibraryList data={folders} />
    </Suspense>
  );
}

export default FoldersList;
