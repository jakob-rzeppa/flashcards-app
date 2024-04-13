import React, { useContext, useState } from "react";

import getCards from "@/actions/getCards";
import getName from "@/actions/getName";
import StackContent from "./StackContent";

interface Props {
  searchParams: { id: string };
}

async function StackPage({ searchParams: { id } }: Props) {
  const cards = await getCards(parseInt(id));

  const name = await getName("stacks", parseInt(id));

  return (
    <div className="mt-8">
      <h1 className="text-4xl font-bold w-full text-center">{name}</h1>
      <StackContent cardsData={cards ? cards : []} id={parseInt(id)} />
    </div>
  );
}

export default StackPage;
