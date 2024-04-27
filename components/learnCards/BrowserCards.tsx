"use client";

import React, { useEffect, useRef, useState } from "react";

import { FaArrowLeft, FaArrowRight, FaArrowDown } from "react-icons/fa";

import "./rotate.css";
import "./animation.css";
import getCardLevel from "@/actions/cards/client/getCardLevel";
import { updateCardLevel } from "@/actions/cards/client/updateCardLevel";

interface Props {
  cards: {
    created_at: string;
    definition: string;
    id: number;
    owner_id: string;
    stack_id: number;
    word: string;
  }[];
  onFinished: () => void;
}

type dir = "right" | "left" | "down";

function BrowserCards({ cards, onFinished }: Props) {
  const [index, setIndex] = useState(0);
  const [prevCards, setPrevCards] = useState<
    { index: number; level: number }[]
  >([]);
  const [learnedCards, setLearnedCards] = useState<number[]>([]);

  const [rotated, setRotated] = useState(false);

  const [animation, setAnimation] = useState<"none" | dir>("none");
  const [visible, setVisible] = useState(true);

  const rotateCard = () => {
    setRotated(rotated ? false : true);
  };

  const changeCardLevel = async (dir: dir, indexToChange: number) => {
    if (indexToChange >= cards.length) return;

    const cardLevel = await getCardLevel(cards[indexToChange].id);

    const newPrevCards = [
      ...prevCards,
      { index: indexToChange, level: cardLevel },
    ];
    setPrevCards(newPrevCards);

    if (cardLevel === -1) {
      return;
    }

    switch (dir) {
      case "left":
        updateCardLevel(cards[indexToChange].id, 0);
        break;
      case "right":
        updateCardLevel(cards[indexToChange].id, cardLevel + 1);
        break;
      case "down":
        updateCardLevel(cards[indexToChange].id, cardLevel - 1);
    }
  };

  const nextCard = async (dir: dir) => {
    let indexToChange = index;
    let newLearnedCards = learnedCards;

    if (dir === "right") {
      newLearnedCards = [...learnedCards, indexToChange];
    }

    let nextIndex = indexToChange + 1;

    if (nextIndex >= cards.length) {
      if (newLearnedCards.length >= cards.length) {
        newLearnedCards = [];
        onFinished();
      }

      nextIndex = 0;
    }

    while (learnedCards.includes(nextIndex) || nextIndex >= cards.length) {
      nextIndex = nextIndex + 1;
    }

    setLearnedCards(newLearnedCards);
    setIndex(nextIndex);
  };

  const onSwipe = (dir: dir) => {
    setAnimation(dir);
    changeCardLevel(dir, index);

    setTimeout(() => {
      setRotated(false);
      setVisible(false);

      setTimeout(() => {
        setAnimation("none");
        nextCard(dir);
        setVisible(true);
      }, 100);
    }, 200);
  };

  const back = () => {
    const updatedPrevCards = [...prevCards];

    const prevCard = updatedPrevCards.pop()!;

    if (!prevCard) {
      return;
    }

    if (prevCard.index < 0) prevCard.index = cards.length - 1;

    if (learnedCards[learnedCards.length - 1] === prevCard.index) {
      const updatedLearnedCards = [...learnedCards];
      updatedLearnedCards.pop();
      setLearnedCards(updatedLearnedCards);
    }
    updateCardLevel(cards[prevCard.index].id, prevCard.level);

    setPrevCards(updatedPrevCards);
    setIndex(prevCard.index);
  };

  const onKeyDown = (event: KeyboardEvent) => {
    //console.log(event.key);
    switch (event.key) {
      case "ArrowRight":
        onSwipe("right");
        break;
      case "ArrowDown":
        onSwipe("down");
        break;
      case "ArrowLeft":
        onSwipe("left");
        break;
      case " ":
        rotateCard();
        break;
      case "Backspace":
        back();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  });

  return (
    <div className="w-screen h-screen overflow-hidden">
      <progress
        className="progress w-2/3 absolute top-8 left-1/2 -translate-x-1/2"
        value={learnedCards.length}
        max={cards.length}
      ></progress>
      <button
        className="btn btn-circle btn-ghost absolute top-[22%] left-[18%] z-10"
        onClick={back}
      >
        <FaArrowLeft size={20} />
      </button>
      <div
        className={`${animation === "none" ? "" : animation} ${
          visible ? "" : "hidden"
        } card_wrapper w-2/3 h-3/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
        onClick={rotateCard}
      >
        <div
          id="card"
          className={`card bg-neutral relative w-full h-full ${
            rotated ? "rotate" : ""
          }`}
        >
          <div id="front" className="front absolute w-full h-full">
            <p className="text-3xl absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
              {cards[index].word}
            </p>
          </div>
          <div id="back" className="back rotate absolute w-full h-full">
            <p className="text-3xl absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
              {cards[index].definition}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center gap-4 absolute bottom-[10%] left-1/2 -translate-x-1/2 translate-y-1/2">
        <button
          className="btn btn-circle btn-outline btn-primary"
          onClick={() => onSwipe("left")}
        >
          <FaArrowLeft size={20} />
        </button>
        <button
          className="btn btn-circle btn-outline btn-primary"
          onClick={() => onSwipe("down")}
        >
          <FaArrowDown size={20} />
        </button>
        <button
          className="btn btn-circle btn-outline btn-primary"
          onClick={() => onSwipe("right")}
        >
          <FaArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}

export default BrowserCards;
