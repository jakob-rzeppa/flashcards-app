import React, { useMemo } from "react";

import LibraryDisplay from "@/components/library/LibraryDisplay";
import getLibrary from "@/actions/library/server/getLibrary";

interface Props {
  searchParams: { fullLibrary?: boolean };
  params: { libraryPath: string[] };
}

async function LibraryPage({ params: { libraryPath } }: Props) {
  const { folders, stacks } = await getLibrary(undefined);

  return (
    <div className="relative">
      <h2 className="text-3xl text-center pt-8">Library</h2>
      <LibraryDisplay folders={folders} stacks={stacks} path={libraryPath} />
    </div>
  );
}

export default LibraryPage;
