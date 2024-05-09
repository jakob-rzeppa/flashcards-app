import React from "react";

import { getFolderData } from "@/actions/library/server/getFolderData";

import LibraryList from "@/components/library/LibraryList";
import NewElement from "@/components/library/NewElement";
import FolderSettings from "./FolderSettings";
import BackgroundBox from "@/components/BackgroundBox";
import Link from "next/link";
import LibraryPath from "@/components/library/LibraryPath";

interface Props {
  searchParams: {
    id: string;
  };
}

async function FolderPage({ searchParams: { id } }: Props) {
  const folderData = await getFolderData(parseInt(id));
  if (!folderData) return <div>Couldnt fetch folder data</div>;
  const { data, stacks, numOfCards } = folderData;

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
      <h1 className="text-4xl font-bold w-full text-center mb-4">
        {data!.name}
      </h1>
      <h2 className="text-xl font-bold w-full text-center mb-4">
        {data!.description}
      </h2>
      <BackgroundBox>
        <FolderSettings data={data!} />
        <LibraryPath element="folder" id={parseInt(id)} />
        <Link
          href={"/learn?scope=folder&method=shortTermMemory&id=" + data?.id}
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
