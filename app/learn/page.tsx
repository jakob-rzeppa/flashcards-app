import { getCards } from "@/actions/cards/getCards";
import { getCardsToUse } from "@/actions/cards/getCardsToUse";
import SwipeCard from "@/components/learn/SwipeCard";
import React from "react";

interface Props {
  searchParams: {
    scope: string;
    id: string;
  };
}

async function LearnPage({ searchParams: { scope, id } }: Props) {
  const cardsData = await getCards("stack", parseInt(id));
  const { cards: allCards, cardIdLevel } = cardsData;

  const reducedCards = allCards.map((card) => {
    return { id: card.id, box: 0 }; // TODO
  });

  const cards = getCardsToUse(reducedCards, 0);

  return <SwipeCard data={{ word: "word", definition: "definition" }} />;
}

export default LearnPage;
