"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BrowserView, MobileView } from "react-device-detect";

import { getCardsToUse } from "@/actions/cards/client/getCardsToUse";

import Cards from "./Cards";
import BrowserCards from "./BrowserCards";

interface CardData {
  created_at: string;
  definition: string;
  id: number;
  owner_id: string;
  stack_id: number;
  word: string;
}

interface Props {
  cards: CardData[];
}

// Handles getting the current Cards and when all Cards are learned
function CardsManager({ cards }: Props) {
  const router = useRouter();
  const [level, setLevel] = useState(0);
  const [currentCards, setCurrentCards] = useState<CardData[]>([]);
  const [isActive, setIsActive] = useState(false);
  const [finished, setFinished] = useState(false);

  const handleGetCards = () => {
    setIsActive(false);
    const res = getCardsToUse(cards, level);

    res.then((data: CardData[]) => {
      if (data.length <= 0) {
        onNextLevel();
        return;
      }

      setCurrentCards(data);
      setIsActive(true);
    });
  };

  useEffect(() => {
    handleGetCards();
  }, [level]);

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

  const onLowestLevel = () => {
    console.log("Next Box Level: ", 0);
    setLevel(0);
    setFinished(false);
  };

  return isActive ? (
    finished ? (
      <div className="items-center justify-center flex flex-col h-screen gap-8">
        <h2>Done (Level {level})</h2>
        <button className="btn btn-primary" onClick={onNextLevel}>
          Next Level
        </button>
        <button className="btn btn-primary" onClick={onLowestLevel}>
          All from lowest level first
        </button>
        <button className="btn" onClick={() => router.back()}>
          Return
        </button>
      </div>
    ) : (
      <>
        <BrowserView>
          <BrowserCards cards={currentCards} onFinished={onFinished} />
        </BrowserView>
        <MobileView>
          <Cards
            cards={currentCards}
            currentLevel={level}
            onFinished={onFinished}
          />
        </MobileView>
      </>
    )
  ) : (
    <div>Loading...</div>
  );
}

export default CardsManager;
