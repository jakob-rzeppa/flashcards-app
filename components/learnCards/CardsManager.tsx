"use client";

import React, { useEffect, useState } from "react";
import Content from "./Content";
import { getCardsToUse } from "@/actions/cards/client/getCardsToUse";

interface Props {
  cards: {
    created_at: string;
    definition: string;
    id: number;
    owner_id: string;
    stack_id: number;
    word: string;
  }[];
}

function CardsManager({ cards }: Props) {
  const [currentCards, setCurrentCards] = useState<
    {
      created_at: string;
      definition: string;
      id: number;
      owner_id: string;
      stack_id: number;
      word: string;
    }[]
  >([]);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const res = getCardsToUse(cards, 0);

    res.then((data) => {
      setCurrentCards(data);
      setIsActive(true);
    });
  }, []);

  const onFinished = () => {
    console.log("done");
  };

  return isActive ? (
    <Content cards={currentCards} onFinished={onFinished} />
  ) : (
    <div>Loading...</div>
  );
}

export default CardsManager;
