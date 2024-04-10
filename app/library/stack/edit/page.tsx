import getCards from "@/actions/getCards";
import React from "react";
import EditCards from "./EditCards";
import getMasteryLevel from "@/actions/getMasteryLevel";

interface Props {
  searchParams: {
    id: string;
  };
}

async function StackEditPage({ searchParams: { id } }: Props) {
  const cards = await getCards(parseInt(id));
  const masteryLevel = cards
    ? await getMasteryLevel(cards?.map((card) => card.id))
    : null;

  return (
    <div>
      <h1 className="w-full text-4xl text-center my-6">StackEditPage</h1>
      <EditCards
        cards={cards ? cards : []}
        masteryLevel={masteryLevel ? masteryLevel : []}
        stackId={parseInt(id)}
      />
    </div>
  );
}

export default StackEditPage;
