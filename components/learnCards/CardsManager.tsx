"use client";

import React, { createContext, useEffect, useState } from "react";

import NavButton from "../navigation/NavButton";
import BrowserCards from "./BrowserCards";
import { useRouter } from "next/navigation";

export interface CardData {
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

export const currentCardsContext = createContext<{
  currentCards: CardData[];
  setCurrentCards: React.Dispatch<React.SetStateAction<CardData[]>>;
} | null>(null);

function CardsManager({ cards, prevHref }: Props) {
  const router = useRouter();

  const [currentCards, setCurrentCards] = useState<CardData[]>(cards);

  useEffect(() => {
    if (currentCards.length <= 0) {
      router.push(prevHref);
    }
  }, [currentCards]);

  const [isFinished, setIsFinished] = useState(false);

  const onFinished = () => {
    setIsFinished(true);
  };

  const onLearnWrongCards = () => {
    setIsFinished(false);
  };

  return (
    <>
      <NavButton href={prevHref} className="absolute top-4 left-4" />
      {!isFinished ? (
        <currentCardsContext.Provider value={{ currentCards, setCurrentCards }}>
          <BrowserCards onFinished={onFinished} />
        </currentCardsContext.Provider>
      ) : (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
          <button className="btn btn-primary" onClick={onLearnWrongCards}>
            Learn wrong cards
          </button>
        </div>
      )}
    </>
  );
}

export default CardsManager;
