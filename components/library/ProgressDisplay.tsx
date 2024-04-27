import { getAllCardLevels } from "@/actions/cards/server/getAllCardLevels";
import { getCards } from "@/actions/cards/server/getCards";
import Loading from "@/app/loading";
import React, { Suspense } from "react";

interface Props {
  scope: "stack" | "folder" | "course" | "library";
  id?: number;
}

async function ProgressDisplay({ scope, id }: Props) {
  const cards = await getCards(scope, id);

  const levels = await getAllCardLevels(cards);

  return (
    <Suspense fallback={<Loading />}>
      <div className="w-full h-2 bg-red-600 rounded-full flex flex-row overflow-hidden">
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
    </Suspense>
  );
}

export default ProgressDisplay;
