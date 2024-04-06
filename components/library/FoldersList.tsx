import React, { Suspense } from "react";

import getFolders from "@/actions/getFolders";

import LibraryList from "./LibraryList";

interface Props {
  courseId: string;
}

async function FoldersList({ courseId }: Props) {
  const folders = await getFolders(courseId);

  const data: {
    href: string;
    name: string;
    description: string | null;
    badgeText: string;
  }[] = folders
    ? folders.map((folder) => ({
        href: "/library/" + courseId + "/" + folder.id,
        name: folder.name,
        description: null,
        badgeText: "",
      }))
    : [];

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LibraryList data={data} />
    </Suspense>
  );
}

export default FoldersList;
