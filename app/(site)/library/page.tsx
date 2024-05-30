import React from "react";

import BackgroundBox from "@/components/BackgroundBox";
import LibraryDisplay from "@/components/library/LibraryDisplay";
import getUserLibrary from "@/actions/library/server/getUserLibrary";

async function LibraryPage() {
  const { folders, stacks } = await getUserLibrary();

  return (
    <div className="flex flex-col justify-center items-center gap-8 mt-8">
      <h2 className="text-3xl">Courses</h2>
      <BackgroundBox>
        <LibraryDisplay folders={folders} stacks={stacks} />
      </BackgroundBox>
    </div>
  );
}

export default LibraryPage;
