import React from "react";

import BackgroundBox from "@/components/BackgroundBox";
import LibraryDisplay from "@/components/library/LibraryDisplay";
import getOwnLibrary from "@/actions/library/server/getOwnLibrary";
import getFullLibrary from "@/actions/library/server/getFullLibrary";

interface Props {
  searchParams: { fullLibrary?: boolean };
}

async function LibraryPage({ searchParams: { fullLibrary } }: Props) {
  const { folders, stacks } = fullLibrary
    ? await getFullLibrary()
    : await getOwnLibrary();

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
