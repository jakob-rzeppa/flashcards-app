import React, { useEffect, useState } from "react";
import Card from "./Card";
import getCardLevel from "@/actions/cards/client/getCardLevel";
import { updateCardLevel } from "@/actions/cards/client/updateCardLevel";
import { FiArrowLeft } from "react-icons/fi";

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

function Content({ cards, onFinished, currentLevel }: Props) {
  if (cards.length === 0) {
    return <div>No Cards</div>;
  }

  // State to manage the current index
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    console.log("Current Index Updated:", currentIndex);
  }, [currentIndex]);

  // Store the learned cards
  const [rightCards, setRightCards] = useState<number[]>([]);

  const [currentWord, setCurrentWord] = useState(cards[currentIndex].word);
  const [currentDefinition, setCurrentDefinition] = useState(
    cards[currentIndex].definition
  );

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

    // Saves every learned card
    if (dir === "right" && !rightCards.includes(index)) {
      setRightCards([...rightCards, index]);
    }

    changeCardLevel(dir, index);

    console.log("Before index:", index);

    let nextIndex = index + 1;

    while (rightCards.includes(nextIndex) || nextIndex >= cards.length) {
      nextIndex = (nextIndex + 1) % cards.length;
    }

    setCurrentIndex(nextIndex);

    console.log("After index:", nextIndex);

    setCurrentIndex(nextIndex);
    setCurrentWord(cards[nextIndex].word);
    setCurrentDefinition(cards[nextIndex].definition);
  };

  const back = () => {
    const lastIndex = currentIndex - 1;

    if (lastIndex < 0) return; // Prevent going back if already at the first card

    if (rightCards[rightCards.length - 1] === lastIndex) {
      const updatedRightCards = [...rightCards];
      updatedRightCards.pop();
      setRightCards(updatedRightCards);
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
        value={rightCards.length}
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

export default Content;
