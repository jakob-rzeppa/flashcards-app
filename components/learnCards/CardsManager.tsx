"use client";

import React, { useEffect, useState } from "react";
import { getCardsToUse } from "@/actions/cards/client/getCardsToUse";
import { useRouter } from "next/navigation";
import Content from "./Content";

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

  const handleGetCards = () => {
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
    handleGetCards();
  }, [level]);

  const [finished, setFinished] = useState(false);

  const onFinished = () => {
    setFinished(true);
  };

  const onNextLevel = () => {
    const nextLevel = level + 1;
    if (nextLevel > 3) {
      router.back();
      return;
    }
    console.log("Next Box Level: ", nextLevel);
    setLevel(nextLevel);
    setFinished(false);
  };

  return isActive ? (
    finished ? (
      <button className="btn btn-primary" onClick={onNextLevel}>
        Next Level
      </button>
    ) : (
      <Content
        cards={currentCards}
        currentLevel={level}
        onFinished={onFinished}
      />
    )
  ) : (
    <div>Loading...</div>
  );
}

export default CardsManager;
