"use client";

import React, { useEffect, useState } from "react";
import Content from "./Content";
import { getCardsToUse } from "@/actions/cards/client/getCardsToUse";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const [level, setLevel] = useState(0);

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

  const getCards = () => {
    setIsActive(false);
    const res = getCardsToUse(cards, level, 5);

    res.then(
      (
        data: {
          created_at: string;
          definition: string;
          id: number;
          owner_id: string;
          stack_id: number;
          word: string;
        }[]
      ) => {
        setCurrentCards(data);
        setIsActive(true);
      }
    );
  };

  useEffect(() => {
    getCards();
  }, [level]);

  const onFinished = () => {
    const nextLevel = level + 1;

    if (nextLevel > 3) {
      router.back();
      return;
    }

    setLevel(nextLevel);
    console.log("Next Level: ", nextLevel);
  };

  return isActive ? (
    <Content cards={currentCards} onFinished={onFinished} />
  ) : (
    <div>Loading...</div>
  );
}

export default CardsManager;
