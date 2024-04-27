import React from "react";

import { getFolderData } from "@/actions/library/server/getFolderData";

import NavButton from "@/components/navigation/NavButton";
import LibraryList from "@/components/library/LibraryList";
import NewElement from "@/components/library/NewElement";
import FolderSettings from "./FolderSettings";
import BackgroundBox from "@/components/BackgroundBox";
import Link from "next/link";
import ProgressDisplay from "@/components/library/ProgressDisplay";

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
    <div className="mt-8 relative">
      <NavButton
        href={`/library/course?id=${data!.course_id}`}
        className="absolute top-0 left-8"
      />
      <FolderSettings data={data!} />
      <h1 className="text-4xl font-bold w-full text-center mb-4">
        {data!.name}
      </h1>
      <h2 className="text-xl font-bold w-full text-center mb-4">
        {data!.description}
      </h2>
      <BackgroundBox>
        <ProgressDisplay scope="folder" id={parseInt(id)} />
        <Link
          href={"/learn?scope=folder&id=" + data?.id}
          className="btn btn-primary w-full"
        >
          Learn all
        </Link>
        <LibraryList data={stacksDisplay} />
        <NewElement type="stack" id={parseInt(id)} />
      </BackgroundBox>
    </div>
  );
}

export default FolderPage;
