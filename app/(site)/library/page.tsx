import React from "react";

import BackgroundBox from "@/components/BackgroundBox";
import LibraryDisplay from "@/components/library/LibraryDisplay";
import getLibrary from "@/actions/library/server/getLibrary";

interface Props {
  searchParams: { user?: string };
}

async function LibraryPage({ searchParams: { user } }: Props) {
  const { folders, stacks } = await getLibrary(user);

  return (
    <div className="flex flex-col justify-center items-center gap-8 mt-8">
      <h2 className="text-3xl">Library</h2>
      <BackgroundBox>
        <LibraryDisplay folders={folders} stacks={stacks} />
      </BackgroundBox>
    </div>
  );
}

export default LibraryPage;
