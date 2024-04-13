import React from "react";

import StacksList from "@/app/(site)/library/(libElements)/folder/StacksList";
import getName from "@/actions/getName";
import NavButton from "@/components/navigation/NavButton";

interface Props {
  searchParams: {
    id: string;
  };
}

async function FolderPage({ searchParams: { id } }: Props) {
  const name = await getName("folders", parseInt(id));
  return (
    <div className="flex flex-col gap-8 justify-center items-center mt-8 relative">
      <h1 className="text-4xl font-bold">{name}</h1>
      <StacksList folderId={id} />
    </div>
  );
}

export default FolderPage;
