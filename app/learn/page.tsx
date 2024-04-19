import { getCards } from "@/actions/cards/getCards";
import { getCardsToUse } from "@/actions/cards/getCardsToUse";
import SwipeCard from "@/components/learn/SwipeCard";
import Content from "@/components/learnCards/Content";
import React from "react";

interface Props {
  searchParams: {
    scope: string;
    id: string;
  };
}

async function LearnPage({ searchParams: { scope, id } }: Props) {
  //const allCards = await getCards("stack", parseInt(id));

  //console.log(allCards);

  //const cards = getCardsToUse(allCards, 0);

  return <Content />;
}

export default LearnPage;
