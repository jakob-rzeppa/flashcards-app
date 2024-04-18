import React from "react";

import { getFolderData } from "@/actions/library/getFolderData";

import NavButton from "@/components/navigation/NavButton";
import LibraryList from "@/components/library/LibraryList";
import NewElement from "@/components/library/NewElement";
import FolderSettings from "./FolderSettings";

interface Props {
  searchParams: {
    id: string;
  };
}

async function FolderPage({ searchParams: { id } }: Props) {
  //TODO error handling
  const { data, stacks, numOfCards } = await getFolderData(parseInt(id));

  const stacksDisplay: {
    href: string;
    name: string;
    description: string | null;
    badgeText: string;
  }[] = stacks!.map((stack, index) => ({
    href: `/library/stack?id=${stack.id}`,
    name: stack.name,
    description: null,
    badgeText: "Cards: " + numOfCards![index],
  }));

  return (
    <div className="flex flex-col gap-8 justify-center items-center mt-8 relative">
      <NavButton
        href={`/library/course?id=${data!.course_id}`}
        className="absolute top-0 left-8"
      />
      <FolderSettings id={parseInt(id)} courseId={data?.course_id!} />
      <h1 className="text-4xl font-bold">{data!.name}</h1>
      <LibraryList data={stacksDisplay} />
      <NewElement type="stack" id={parseInt(id)} />
    </div>
  );
}

export default FolderPage;
