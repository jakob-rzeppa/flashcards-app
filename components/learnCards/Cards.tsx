import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";

import getCardLevel from "@/actions/cards/client/getCardLevel";
import { updateCardLevel } from "@/actions/cards/client/updateCardLevel";

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
  currentLevel: number;
  onFinished: () => void;
}

// Handles the cards and updates on swipe or back
function Cards({ cards, onFinished, currentLevel }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [learnedCards, setLearnedCards] = useState<number[]>([]);
  const [currentWord, setCurrentWord] = useState(cards[currentIndex].word);
  const [currentDefinition, setCurrentDefinition] = useState(
    cards[currentIndex].definition
  );

  if (cards.length === 0) {
    return <div>No Cards</div>;
  }

  const changeCardLevel = async (
    dir: "left" | "right" | "bottom",
    index: number
  ) => {
    if (index >= cards.length) return;

    const cardLevel = await getCardLevel(cards[index].id);

    if (cardLevel === -1) {
      return;
    }

    switch (dir) {
      case "left":
        updateCardLevel(cards[index].id, 0);
        break;
      case "right":
        updateCardLevel(cards[index].id, cardLevel + 1);
        break;
      case "bottom":
        updateCardLevel(cards[index].id, cardLevel - 1);
    }
  };

  const onSwipe = (dir: "left" | "right" | "bottom") => {
    let index = currentIndex;
    let newLearnedCards = learnedCards;

    if (dir === "right" && !learnedCards.includes(index)) {
      newLearnedCards = [...learnedCards, index];
    }

    changeCardLevel(dir, index);

    let nextIndex = index + 1;

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
    setCurrentIndex(nextIndex);
    setCurrentWord(cards[nextIndex].word);
    setCurrentDefinition(cards[nextIndex].definition);
  };

  const back = () => {
    let lastIndex = currentIndex - 1;

    if (lastIndex < 0) lastIndex = cards.length - 1;

    if (learnedCards[learnedCards.length - 1] === lastIndex) {
      const updatedLearnedCards = [...learnedCards];
      updatedLearnedCards.pop();
      setLearnedCards(updatedLearnedCards);
    }
    updateCardLevel(cards[lastIndex].id, currentLevel);
    setCurrentIndex(lastIndex);
    setCurrentWord(cards[lastIndex].word);
    setCurrentDefinition(cards[lastIndex].definition);
  };

  return (
    <div>
      <button
        className="btn btn-circle btn-ghost absolute top-4 left-4"
        onClick={back}
      >
        <FiArrowLeft size={20} />
      </button>
      <progress
        className="progress w-2/3 absolute top-16 left-1/2 -translate-x-1/2"
        value={learnedCards.length}
        max={cards.length}
      ></progress>
      <Card
        word={currentWord}
        definition={currentDefinition}
        onSwipe={onSwipe}
      />
    </div>
  );
}

export default Cards;
