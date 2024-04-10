import React from "react";

import getCards from "@/actions/getCards";
import StackActions from "./StackActions";

interface Props {
  searchParams: { id: string };
}

async function StackPage({ searchParams: { id } }: Props) {
  const cards = await getCards(parseInt(id));

  return (
    <div className="flex flex-col gap-8 justify-center items-center mt-8">
      <h1 className="text-4xl font-bold">{"stack name"}</h1>
      <StackActions id={id} />
      <h2 className="text-3xl font-semibold">Cards</h2>
      <div className="flex flex-col md:w-3/5 w-4/5 gap-3">
        {cards?.map((card, index) => (
          <div className="bg-neutral rounded-md p-2 w-full" key={index}>
            <h3 className="text-xl">{card.word}</h3>
            <h4 className="text-md">{card.definition}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StackPage;
