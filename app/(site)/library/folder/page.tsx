import React from "react";

import { getFolderData } from "@/actions/library/getFolderData";

import NavButton from "@/components/navigation/NavButton";
import LibraryList from "@/components/library/LibraryList";

interface Props {
  searchParams: {
    id: string;
  };
}

async function FolderPage({ searchParams: { id } }: Props) {
  //TODO error handling
  const { data, stacks } = await getFolderData(parseInt(id));

  const stacksDisplay: {
    href: string;
    name: string;
    description: string | null;
    badgeText: string;
  }[] = stacks!.map((stack) => ({
    href: `/library/stack?id=${stack.id}`,
    name: stack.name,
    description: null,
    badgeText: "Stacks: ?",
  }));

  return (
    <div className="flex flex-col gap-8 justify-center items-center mt-8 relative">
      <NavButton
        href={`/library/course?id=${data!.course_id}`}
        className="absolute top-0 left-8"
      />
      <h1 className="text-4xl font-bold">{data!.name}</h1>
      <LibraryList data={stacksDisplay} />
    </div>
  );
}

export default FolderPage;
