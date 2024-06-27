import React from "react";

import BackgroundBox from "@/components/ui/BackgroundBox";
import LibraryDisplay from "@/components/library/LibraryDisplay";
import getUserLibrary from "@/actions/library/server/getUserLibrary";
import getFullLibrary from "@/actions/library/server/getFullLibrary";

interface Props {
  searchParams: { fullLibrary?: boolean };
}

async function LibraryPage({ searchParams: { fullLibrary } }: Props) {
  const { folders, stacks } = fullLibrary
    ? await getFullLibrary()
    : await getUserLibrary();

  return (
    <div className="flex flex-col justify-center items-center gap-8 mt-8">
      <h2 className="text-3xl">Library</h2>
      <LibraryDisplay folders={folders} stacks={stacks} />
    </div>
  );
}

export default LibraryPage;
