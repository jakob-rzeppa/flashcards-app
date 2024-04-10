"use client";

import React, { useEffect, useState } from "react";

import updateCard from "@/actions/updateCard";

interface Props {
  data: {
    created_at: string;
    definition: string;
    id: number;
    owner_id: string | null;
    stack_id: number;
    word: string;
  }[];
  masteryLevel: {
    card_id: number;
    level: number;
    user_id: string;
  }[];
  stackId: number;
}

function EditCards({ data, masteryLevel, stackId }: Props) {
  const [cards, setCards] = useState(data);

  // Variables used in the modal, will be reset on save or close of Modal
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [indexToEdit, setIndexToEdit] = useState<number | null>(null);

  const handleEditCard = (index: number) => {
    setWord(cards[index].word);
    setDefinition(cards[index].definition);
    setIndexToEdit(index);

    (
      document.getElementById("edit_card_modal") as HTMLDialogElement
    ).showModal();
  };

  const resetModal = () => {
    setWord("");
    setDefinition("");
    setIndexToEdit(null);
  };

  const saveEditedCard = () => {
    if (indexToEdit === null) {
      console.log("indexToEdit not defined");
      return;
    }

    if (
      word === cards[indexToEdit].word &&
      definition === cards[indexToEdit].definition
    )
      return;

    updateCard(cards[indexToEdit].id, word, definition);

    const tempCards = cards.map((card) => card);
    tempCards[indexToEdit].word = word;
    tempCards[indexToEdit].definition = definition;
    setCards(tempCards);

    resetModal();
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-4 w-3/5 mx-auto">
        {cards.map((card, index) => (
          <button
            onClick={() => handleEditCard(index)}
            className="btn w-full btn-neutral text-start items-center justify-start"
            key={card.id}
          >
            <h3 className="text-xl w-1/2">{card.word}</h3>
            <h4 className="text-xl">{card.definition}</h4>
          </button>
        ))}
      </div>
      <dialog id="edit_card_modal" className="modal">
        <div className="modal-box">
          <div className="flex flex-col gap-4 m-8">
            <form method="dialog">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={resetModal}
              >
                ✕
              </button>
            </form>
            <input
              className="input input-primary"
              type="text"
              id="word"
              placeholder="word"
              value={word}
              onChange={(e) => setWord(e.target.value)}
            />
            <input
              className="input input-primary"
              type="text"
              id="definition"
              placeholder="definition"
              value={definition}
              onChange={(e) => setDefinition(e.target.value)}
            />
            <form method="dialog">
              <button
                className="btn btn-neutral w-full"
                onClick={saveEditedCard}
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default EditCards;
