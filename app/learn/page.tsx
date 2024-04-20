import { getCards } from "@/actions/cards/server/getCards";
import { getCardsToUse } from "@/actions/cards/server/getCardsToUse";
import Content from "@/components/learnCards/Content";
import React from "react";

interface Props {
  searchParams: {
    scope: "stack" | "folder" | "course" | "library";
    id: string;
  };
}

async function LearnPage({ searchParams: { scope, id } }: Props) {
  const allCards = await getCards(scope, parseInt(id));

  console.log(allCards);

  const cards = await getCardsToUse(allCards, 0);

  return <Content cards={cards} />;
}

export default LearnPage;
