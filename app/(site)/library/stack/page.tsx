import React from "react";

import { getStackData } from "@/actions/library/server/getStackData";
import StackSettings from "./StackSettings";
import BackgroundBox from "@/components/BackgroundBox";
import LibraryPath from "@/components/library/LibraryPath";
import Link from "next/link";
import EditCards from "./EditCards";

interface Props {
  searchParams: { id: string };
}

async function StackPage({ searchParams: { id } }: Props) {
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
        <StackSettings data={data!} cards={cards} />
        <LibraryPath element="stack" id={parseInt(id)} />
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
