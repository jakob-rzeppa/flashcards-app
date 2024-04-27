"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BrowserView, MobileView } from "react-device-detect";

import { getCardsToUse } from "@/actions/cards/client/getCardsToUse";

import Cards from "./Cards";
import BrowserCards from "./BrowserCards";
import { getAllCardLevels } from "@/actions/cards/client/getAllCardLevels";
import shuffleCards from "@/actions/cards/client/shuffleCards";
import NavButton from "../navigation/NavButton";

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
  prevHref: string;
}

// Handles getting the current Cards and when all Cards are learned
function CardsManager({ cards, prevHref }: Props) {
  const [cardLevels, setCardLevels] = useState<{
    0: number;
    1: number;
    2: number;
    3: number;
  }>({ 0: 0, 1: 0, 2: 0, 3: 0 });

  const router = useRouter();
  const [level, setLevel] = useState(0);
  const [currentCards, setCurrentCards] = useState<CardData[]>([]);
  const [isActive, setIsActive] = useState(false);
  const [finished, setFinished] = useState(false);

  const handleGetCards = (currentLevel: number) => {
    setIsActive(false);
    const res = getCardsToUse(cards, currentLevel);

    res.then((data: CardData[]) => {
      if (data.length <= 0) {
        onNextLevel();
        return;
      }

      const shuffledCards = shuffleCards(data);

      setCurrentCards(shuffledCards);
      setIsActive(true);
    });
  };

  useEffect(() => {
    handleGetCards(level);
  }, [level]);

  const onFinished = async () => {
    setFinished(true);
    setIsActive(false);
    setCardLevels(await getAllCardLevels(cards));
    setIsActive(true);
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
    const nextLevel = 0;
    console.log("Next Box Level: ", nextLevel);

    setLevel(nextLevel);
    setFinished(false);
  };

  useEffect(() => {
    handleGetCards(0);
  }, []);

  return (
    <>
      <NavButton href={prevHref} className="absolute top-4 left-4" />
      {isActive ? (
        finished ? (
          <div className="items-center justify-center flex flex-col h-screen gap-8">
            <div className="w-4/5 h-2 bg-red-600 rounded-full flex flex-row overflow-hidden">
              <div
                className={`h-full bg-green-500`}
                style={{ width: `${(cardLevels[3] / cards?.length!) * 100}%` }}
              ></div>
              <div
                className={`h-full bg-yellow-500`}
                style={{ width: `${(cardLevels[2] / cards?.length!) * 100}%` }}
              ></div>
              <div
                className={`h-full bg-orange-500`}
                style={{ width: `${(cardLevels[1] / cards?.length!) * 100}%` }}
              ></div>
            </div>
            <button className="btn btn-primary" onClick={onNextLevel}>
              Next Level
            </button>
            <button className="btn btn-primary" onClick={onLowestLevel}>
              All from lowest level first
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
    </>
  );
}

export default CardsManager;
