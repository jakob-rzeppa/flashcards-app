import React from "react";

import StackContent from "./StackContent";
import NavButton from "@/components/navigation/NavButton";
import { getStackData } from "@/actions/library/server/getStackData";
import StackSettings from "./StackSettings";
import BackgroundBox from "@/components/BackgroundBox";
import { getAllCardLevels } from "@/actions/cards/server/getAllCardLevels";
import ProgressDisplay from "@/components/library/ProgressDisplay";
import LibraryPath from "@/components/library/LibraryPath";

interface Props {
  searchParams: { id: string };
}

async function StackPage({ searchParams: { id } }: Props) {
  // TODO error handling
  const { data, cards } = await getStackData(parseInt(id));

  return (
    <div className="mt-8">
      <h1 className="text-4xl font-bold w-full text-center mb-4">
        {data?.name}
      </h1>
      <h2 className="text-xl font-bold w-full text-center mb-4">
        {data!.description}
      </h2>
      <BackgroundBox>
        <StackSettings data={data!} cards={cards!} />
        <LibraryPath element="stack" id={parseInt(id)} />
        <div className="w-4/5">
          <ProgressDisplay scope="stack" id={parseInt(id)} />
        </div>
        <StackContent cardsData={cards ? cards : []} id={parseInt(id)} />
      </BackgroundBox>
    </div>
  );
}

export default StackPage;
