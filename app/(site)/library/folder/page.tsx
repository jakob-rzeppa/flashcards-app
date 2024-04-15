import React from "react";

import { getFolderData } from "@/actions/getFolderData";

import StacksList from "@/app/(site)/library/folder/StacksList";

interface Props {
  searchParams: {
    id: string;
  };
}

async function FolderPage({ searchParams: { id } }: Props) {
  //TODO error handling
  const data = await getFolderData(parseInt(id));

  return (
    <div className="flex flex-col gap-8 justify-center items-center mt-8 relative">
      <h1 className="text-4xl font-bold">{data.data!.name}</h1>
      <StacksList folderId={id} />
    </div>
  );
}

export default FolderPage;
