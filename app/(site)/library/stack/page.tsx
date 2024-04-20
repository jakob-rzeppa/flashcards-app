import React from "react";

import StackContent from "./StackContent";
import NavButton from "@/components/navigation/NavButton";
import { getStackData } from "@/actions/library/getStackData";
import StackSettings from "./StackSettings";
import BackgroundBox from "@/components/BackgroundBox";
import { getAllCardLevels } from "@/actions/cards/getAllCardLevels";

interface Props {
  searchParams: { id: string };
}

async function StackPage({ searchParams: { id } }: Props) {
  // TODO error handling
  const { data, cards } = await getStackData(parseInt(id));

  const levels = await getAllCardLevels(cards!);

  console.log(levels);

  return (
    <div className="mt-8">
      <NavButton
        href={`/library/folder?id=${data?.folder_id}`}
        className="absolute left-8"
      />
      <StackSettings data={data!} cards={cards!} />
      <h1 className="text-4xl font-bold w-full text-center mb-4">
        {data?.name}
      </h1>
      <BackgroundBox>
        <div className="w-4/5 h-2 bg-red-600 rounded-full flex flex-row overflow-hidden">
          <div
            className={`h-full bg-green-500`}
            style={{ width: `${(levels[3] / cards?.length!) * 100}%` }}
          ></div>
          <div
            className={`h-full bg-yellow-500`}
            style={{ width: `${(levels[2] / cards?.length!) * 100}%` }}
          ></div>
          <div
            className={`h-full bg-orange-500`}
            style={{ width: `${(levels[1] / cards?.length!) * 100}%` }}
          ></div>
        </div>
        <StackContent cardsData={cards ? cards : []} id={parseInt(id)} />
      </BackgroundBox>
    </div>
  );
}

export default StackPage;
