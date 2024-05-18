"use client";

import React, { useContext, useEffect, useState } from "react";

import { FaArrowLeft, FaArrowRight, FaArrowDown } from "react-icons/fa";

import "./rotate.css";
import "./animation.css";
import { currentCardsContext } from "./CardsManager";
import { typeCards } from "@/types";

interface Props {
  onFinished: () => void;
}

type dir = "right" | "left" | "down";

function BrowserCards({ onFinished }: Props) {
  const currentCardsOrNull = useContext(currentCardsContext);
  if (!currentCardsOrNull) {
    return <div>Error: Card Context not supplying cards</div>;
  }

  const { currentCards, setCurrentCards } = currentCardsOrNull;

  const [index, setIndex] = useState(0);
  const [prevCards, setPrevCards] = useState<
    { index: number; right: boolean }[]
  >([]);

  const [rotated, setRotated] = useState(false);

  const [animation, setAnimation] = useState<"none" | dir>("none");
  const [visible, setVisible] = useState(true);

  const rotateCard = () => {
    setRotated(rotated ? false : true);
  };

  const nextCard = (dir: dir) => {
    const nextPrevCards = [...prevCards, { index, right: dir === "right" }];

    let nextIndex = index + 1;

    if (nextIndex >= currentCards.length) {
      setIndex(0);

      // update current cards
      const nextCards: typeCards = [];
      nextPrevCards.forEach((card) => {
        if (!card.right) {
          nextCards.push(currentCards[card.index]);
        }
      });
      setCurrentCards(nextCards);

      setPrevCards([]);
      onFinished();
      return;
    }
    setPrevCards(nextPrevCards);
    setIndex(nextIndex);
  };

  const onSwipe = (dir: dir) => {
    setAnimation(dir);

    setTimeout(() => {
      setRotated(false);
      setVisible(false);
      // TODO change in database

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

    if (prevCard.index < 0) prevCard.index = currentCards.length - 1;

    // TODO change in databse

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
        value={prevCards.length}
        max={currentCards.length}
      ></progress>

      <div
        className={`${animation === "none" ? "" : animation} ${
          visible ? "" : "hidden"
        } card_wrapper w-2/3 z-10 h-3/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none`}
      >
        <div
          id="card"
          className={`card relative w-full h-full ${rotated ? "rotate" : ""}`}
        >
          <div id="front" className="front absolute w-full h-full">
            <button
              className="btn btn-circle btn-ghost absolute top-2 left-2 z-20 pointer-events-auto"
              onClick={back}
            >
              <FaArrowLeft size={20} />
            </button>
          </div>
          <div id="back" className="back rotate absolute w-full h-full">
            <button
              className="btn btn-circle btn-ghost absolute top-2 left-2 z-20 pointer-events-auto"
              onClick={back}
            >
              <FaArrowLeft size={20} />
            </button>
          </div>
        </div>
      </div>

      <div
        className={`${animation === "none" ? "" : animation} ${
          visible ? "" : "hidden"
        } card_wrapper w-2/3 h-3/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
        onClick={rotateCard}
      >
        <div
          id="card"
          className={`card bg-base-200 text-base-content relative w-full h-full ${
            rotated ? "rotate" : ""
          }`}
        >
          <div id="front" className="front absolute w-full h-full">
            <p className="text-3xl absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
              {currentCards[index]
                ? currentCards[index].front
                : "Something went wrong"}
            </p>
          </div>
          <div id="back" className="back rotate absolute w-full h-full">
            <p className="text-3xl absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
              {currentCards[index]
                ? currentCards[index].back
                : "Something went wrong"}
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
