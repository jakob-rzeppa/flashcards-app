import React from "react";

import StacksList from "@/app/library/folder/StacksList";

interface Props {
  searchParams: {
    id: string;
  };
}

function FolderPage({ searchParams: { id } }: Props) {
  return (
    <div className="flex flex-col gap-8 justify-center items-center mt-8">
      <h1 className="text-4xl font-bold">{}</h1>
      <StacksList folderId={id} />
    </div>
  );
}

export default FolderPage;
