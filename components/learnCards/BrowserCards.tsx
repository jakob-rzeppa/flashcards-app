"use client";

import React, { useRef, useState } from "react";

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

  const updateIndex = (dir: dir) => {
    let indexToChange = index;
    let newLearnedCards = learnedCards;

    if (dir === "right" && !learnedCards.includes(indexToChange)) {
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

  const nextCard = (dir: dir) => {
    changeCardLevel(dir, index);
    setTimeout(() => {
      setRotated(false);
      setVisible(false);
      setTimeout(() => {
        setAnimation("none");
        updateIndex(dir);
        setVisible(true);
      }, 100);
    }, 200);
  };

  const swipeRight = () => {
    setAnimation("right");
    nextCard("right");
  };

  const swipeLeft = () => {
    setAnimation("left");
    nextCard("left");
  };

  const swipeDown = () => {
    setAnimation("down");
    nextCard("down");
  };

  return (
    <div className="w-screen h-screen overflow-hidden">
      <progress
        className="progress w-2/3 absolute top-8 left-1/2 -translate-x-1/2"
        value={learnedCards.length}
        max={cards.length}
      ></progress>
      <button
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
      </button>
      <div className="flex flex-row justify-center items-center gap-4 absolute bottom-[10%] left-1/2 -translate-x-1/2 translate-y-1/2">
        <button
          className="btn btn-circle btn-outline btn-primary"
          onClick={swipeLeft}
        ></button>
        <button
          className="btn btn-circle btn-outline btn-primary"
          onClick={swipeDown}
        ></button>
        <button
          className="btn btn-circle btn-outline btn-primary"
          onClick={swipeRight}
        ></button>
      </div>
    </div>
  );
}

export default BrowserCards;
