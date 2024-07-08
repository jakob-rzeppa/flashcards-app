import React, { useMemo } from "react";

import LibraryDisplay from "@/components/library/LibraryDisplay";
import getLibrary from "@/actions/library/server/getLibrary";

interface Props {
  searchParams: { user?: string };
  params: { libraryPath: string[] };
}

async function LibraryPage({
  params: { libraryPath },
  searchParams: { user },
}: Props) {
  const { folders, stacks } = await getLibrary(user);

  return (
    <div className="relative">
      <h2 className="text-3xl text-center pt-8">Library</h2>
      <LibraryDisplay
        folders={folders}
        stacks={stacks}
        path={libraryPath}
        userId={user}
      />
    </div>
  );
}

export default LibraryPage;
