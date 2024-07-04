import React, { useMemo } from "react";

import LibraryDisplay from "@/components/library/LibraryDisplay";
import getUserLibrary from "@/actions/library/server/getUserLibrary";
import getFullLibrary from "@/actions/library/server/getFullLibrary";

interface Props {
  searchParams: { fullLibrary?: boolean };
  params: { libraryPath: string[] };
}

async function LibraryPage({
  searchParams: { fullLibrary },
  params: { libraryPath },
}: Props) {
  const { folders, stacks } = fullLibrary
    ? await getFullLibrary()
    : await getUserLibrary();

  return (
    <div className="relative">
      <h2 className="text-3xl text-center pt-8">Library</h2>
      <LibraryDisplay folders={folders} stacks={stacks} path={libraryPath} />
    </div>
  );
}

export default LibraryPage;
