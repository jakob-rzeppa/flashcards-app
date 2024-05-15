import React from "react";

import { getStackData } from "@/actions/library/server/getStackData";
import StackSettings from "./StackSettings";
import BackgroundBox from "@/components/BackgroundBox";
import Link from "next/link";
import EditCards from "./EditCards";
import getAllTags from "@/actions/library/server/getAllTags";

interface Props {
  searchParams: { id: string };
}

async function StackPage({ searchParams: { id } }: Props) {
  // TODO error handling
  const allTags = await getAllTags();
  const { data, cards } = await getStackData(parseInt(id));

  if (!data) {
    return <div>Could not load Stack</div>;
  }

  return (
    <div className="mt-8">
      <h1 className="text-4xl font-bold w-full text-center mb-4">
        {data.name}
      </h1>
      <h2 className="text-xl font-bold w-full text-center mb-4">
        {data.description}
      </h2>
      <BackgroundBox>
        <StackSettings
          data={data!}
          cards={cards}
          tags={allTags.map((tag) => tag.name)}
        />
        <Link
          href={"/learn?scope=stack&method=shortTermMemory&id=" + id}
          className="btn btn-primary w-full"
        >
          Learn
        </Link>
        <h2 className="text-3xl font-semibold text-center my-4">Cards</h2>
        <EditCards data={cards ? cards : []} stackId={parseInt(id)} />
      </BackgroundBox>
    </div>
  );
}

export default StackPage;
