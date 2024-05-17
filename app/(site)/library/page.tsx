import React from "react";

import BackgroundBox from "@/components/BackgroundBox";
import "./tagsStyles.css";
import StackDisplay from "@/components/library/StackDisplay";
import getStacks from "@/actions/library/server/getStacks";
import getAllTags from "@/actions/library/server/getAllTags";
import getTags from "@/actions/library/server/getTags";

async function LibraryPage() {
  const stacks = await getStacks();
  const tags = await getTags(stacks);

  return (
    <div className="flex flex-col justify-center items-center gap-8 mt-8">
      <h2 className="text-3xl">Courses</h2>
      <BackgroundBox>
        <StackDisplay stacks={stacks} tags={tags.map((tag) => tag.tag)} />
      </BackgroundBox>
    </div>
  );
}

export default LibraryPage;
