"use client";

import React, { useEffect, useMemo, useState } from "react";

import { FaArrowLeft } from "react-icons/fa";

import "./rotate.css";
import "./animation.css";
import { typeCards } from "@/types";
import CardSwipeButtons from "./CardSwipeButtons";
import EditCardModal, { EditCardData } from "./EditCardModal";
import { BsThreeDotsVertical } from "react-icons/bs";
import shuffleCards from "@/actions/cards/client/shuffleCards";
import Loading from "../ui/Loading";

interface Props {
  onFinished: (nextCards: typeCards) => void;
  currentCards: typeCards;
}

export type dir = "right" | "left" | "down";

function Cards({ onFinished, currentCards }: Props) {
  const [isMounted, setIsMounted] = useState(false);

  const shuffledCurrentCards = useMemo(() => {
    return shuffleCards(currentCards);
  }, [currentCards]);

  const [editCardData, setEditCardData] = useState<EditCardData>(null);

  const [index, setIndex] = useState(0);
  const [prevCards, setPrevCards] = useState<
    { index: number; right: boolean }[]
  >([]);

  const [rotated, setRotated] = useState(false);

  const [animation, setAnimation] = useState<"none" | dir>("none");
  const [visible, setVisible] = useState(true);

  const rotateCard = () => {
    setRotated((rotated) => !rotated);
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

      onFinished(nextCards);
      setPrevCards([]);
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
    // Stop navigation when in edit cards modal
    if (editCardData != null) return;

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

  const onEditCards = () => {
    setEditCardData({
      id: currentCards[index].id,
      front: currentCards[index].front,
      back: currentCards[index].back,
    });
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (shuffledCurrentCards.length <= 0) return <div>No cards found</div>;

  if (!isMounted) return <Loading />;

  return (
    <>
      <div className="w-screen h-screen overflow-hidden">
        <progress
          className="progress w-2/3 absolute top-8 left-1/2 -translate-x-1/2"
          value={prevCards.length}
          max={currentCards.length}
        ></progress>

        <div
          className={`${animation === "none" ? "" : animation} ${
            visible ? "" : "hidden"
          } card_wrapper w-2/3 h-3/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
          onClick={rotateCard}
        >
          <div
            id="card"
            className={`card text-base-content relative w-full h-full ${
              rotated ? "rotate" : ""
            }`}
          >
            <div
              id="front"
              className="front absolute w-full h-full bg-base-200 rounded-2xl"
            >
              <button
                className="btn btn-circle btn-ghost absolute top-2 left-2 pointer-events-auto"
                onClick={(e) => {
                  e.stopPropagation();
                  back();
                }}
              >
                <FaArrowLeft size={20} />
              </button>
              <button
                className="btn btn-circle btn-ghost absolute top-2 right-2 pointer-events-auto"
                onClick={(e) => {
                  e.stopPropagation();
                  onEditCards();
                }}
              >
                <BsThreeDotsVertical size={20} />
              </button>
              <p className="text-3xl absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                {currentCards[index]
                  ? currentCards[index].front
                  : "Something went wrong"}
              </p>
            </div>
            <div
              id="back"
              className="back rotate absolute w-full h-full bg-base-200 rounded-2xl"
            >
              <button
                className="btn btn-circle btn-ghost absolute top-2 left-2 pointer-events-auto"
                onClick={(e) => {
                  e.stopPropagation();
                  back();
                }}
              >
                <FaArrowLeft size={20} />
              </button>
              <button
                className="btn btn-circle btn-ghost absolute top-2 right-2 pointer-events-auto"
                onClick={(e) => {
                  e.stopPropagation();
                  onEditCards();
                }}
              >
                <BsThreeDotsVertical size={20} />
              </button>
              <p className="text-3xl absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                {currentCards[index]
                  ? currentCards[index].back
                  : "Something went wrong"}
              </p>
            </div>
          </div>
        </div>
        <CardSwipeButtons onSwipe={onSwipe} />
      </div>
      <EditCardModal data={editCardData} setData={setEditCardData} />
    </>
  );
}

export default Cards;
