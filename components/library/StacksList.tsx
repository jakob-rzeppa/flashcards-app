import React, { Suspense } from "react";

import getStacks from "@/actions/getStacks";

import LibraryList from "./LibraryList";

interface Props {
  folderId: string;
}

async function FoldersList({ folderId }: Props) {
  const data = await getStacks(parseInt(folderId));

  const stacks: {
    href: string;
    name: string;
    description: string | null;
    badgeText: string;
  }[] = data!.data
    ? data!.data.map((element, index) => ({
        href: "/library/stack?id=" + element.id,
        name: element.name,
        description: null,
        badgeText: "Cards: " + data!.numOfCards[index],
      }))
    : [];

  console.log(stacks);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LibraryList data={stacks} />
    </Suspense>
  );
}

export default FoldersList;
