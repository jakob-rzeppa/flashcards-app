"use client";

import React, { useEffect, useState } from "react";
import { getCardsToUse } from "@/actions/cards/client/getCardsToUse";
import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import Card from "./Card";

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

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => console.log(currentIndex), [currentIndex]);

  const onSwipe = (dir: "right" | "left" | "bottom") => {
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
  };

  return isActive ? (
    <div className="">
      <div className="w-full text-center text-2xl mt-4">Level {level}</div>
      <div>
        <button
          className="btn btn-circle btn-ghost absolute top-4 left-4"
          onClick={() => onSwipe("bottom")}
        >
          <FiArrowLeft size={20} />
        </button>
        {/**<progress
          className="progress w-2/3 absolute top-16 left-1/2 -translate-x-1/2"
          value={rightCards.length}
          max={cards.length}
  ></progress>**/}

        <Card
          word={"currentCards[currentIndex].word"}
          definition={"currentCards[currentIndex].definition"}
          onSwipe={onSwipe}
        />
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default CardsManager;
