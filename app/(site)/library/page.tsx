import React from "react";

import BackgroundBox from "@/components/BackgroundBox";
import StackDisplay from "@/components/library/StackDisplay";
import getStacks from "@/actions/library/server/getStacks";

async function LibraryPage() {
  const stacks = await getStacks();

  return (
    <div className="flex flex-col justify-center items-center gap-8 mt-8">
      <h2 className="text-3xl">Courses</h2>
      <BackgroundBox>
        <StackDisplay stacks={stacks} />
      </BackgroundBox>
    </div>
  );
}

export default LibraryPage;
