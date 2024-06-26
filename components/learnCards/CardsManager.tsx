"use client";

import React, { createContext, useEffect, useState } from "react";

import NavButton from "../navigation/NavButton";
import BrowserCards from "./BrowserCards";
import { useRouter } from "next/navigation";
import { typeCards } from "@/types";

interface Props {
  cards: typeCards;
  prevHref: string;
}

export const currentCardsContext = createContext<{
  currentCards: typeCards;
  setCurrentCards: React.Dispatch<React.SetStateAction<typeCards>>;
} | null>(null);

function CardsManager({ cards, prevHref }: Props) {
  const router = useRouter();

  const [currentCards, setCurrentCards] = useState<typeCards>(cards);

  useEffect(() => {
    if (currentCards.length <= 0) {
      router.push(prevHref);
    }
  }, [currentCards, prevHref, router]);

  const [isFinished, setIsFinished] = useState(false);

  const onFinished = () => {
    setIsFinished(true);
  };

  const onLearnWrongCards = () => {
    setIsFinished(false);
  };

  const onLearnAllCards = () => {
    setCurrentCards(cards);
    setTimeout(() => setIsFinished(false), 100);
  };

  return (
    <>
      <NavButton href={prevHref} className="absolute top-4 left-4" />
      {!isFinished ? (
        <currentCardsContext.Provider value={{ currentCards, setCurrentCards }}>
          <BrowserCards onFinished={onFinished} />
        </currentCardsContext.Provider>
      ) : (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-8">
          <p>
            {cards.length - currentCards.length} of {cards.length} right
          </p>
          <progress
            className="progress w-56"
            value={cards.length - currentCards.length}
            max={cards.length}
          ></progress>
          <button className="btn btn-primary" onClick={onLearnWrongCards}>
            Repeat wrong cards
          </button>
          <button className="btn btn-primary" onClick={onLearnAllCards}>
            Repeat all cards
          </button>
        </div>
      )}
    </>
  );
}

export default CardsManager;
