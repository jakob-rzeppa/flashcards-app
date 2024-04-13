"use client";

import React, { useEffect, useState } from "react";

import { FaRegTrashAlt } from "react-icons/fa";

import updateCard from "@/actions/updateCard";
import createCard from "@/actions/createCard";
import deleteCard from "@/actions/deleteCard";
import { useRouter } from "next/navigation";

interface Props {
  data: {
    created_at: string;
    definition: string;
    id: number;
    owner_id: string | null;
    stack_id: number;
    word: string;
  }[];
  stackId: number;
}

function EditCards({ data, stackId }: Props) {
  const [cards, setCards] = useState(data);

  // Variables used in the modal, will be reset on save or close of Modal
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [indexToEdit, setIndexToEdit] = useState<number | null>(null);
  const [newCard, setNewCard] = useState(false);

  const handleEditCard = (index: number) => {
    setWord(cards[index] ? cards[index].word : "");
    setDefinition(cards[index] ? cards[index].definition : "");
    setIndexToEdit(index);

    (
      document.getElementById("edit_card_modal") as HTMLDialogElement
    ).showModal();
  };

  const resetModal = () => {
    setWord("");
    setDefinition("");
    setIndexToEdit(null);
    setNewCard(false);
  };

  const handleNewCard = () => {
    setNewCard(true);
    handleEditCard(cards.length);
  };

  const handleDeleteCard = () => {
    if (indexToEdit === null) {
      console.log("indexToEdit not defined");
      return;
    }

    if (cards[indexToEdit]) {
      deleteCard(cards[indexToEdit].id);

      const tempCards = cards.map((card) => card);
      tempCards.splice(indexToEdit, 1);
      setCards(tempCards);
    }

    resetModal();
  };

  const saveEditedCard = async () => {
    if (indexToEdit === null) {
      console.log("indexToEdit not defined");
      return;
    }

    if (
      word === (cards[indexToEdit] ? cards[indexToEdit].word : "") &&
      definition === (cards[indexToEdit] ? cards[indexToEdit].definition : "")
    )
      return;

    if (newCard) {
      const newCardData = await createCard(stackId, word, definition);

      if (!newCardData) {
        console.error("Some error happened while trying to insert a new card!");
        return;
      }

      const tempCards = cards.map((card) => card);
      tempCards[tempCards.length] = newCardData[0];
      setCards(tempCards);

      resetModal();
      return;
    }

    updateCard(cards[indexToEdit].id, word, definition);

    const tempCards = cards.map((card) => card);
    tempCards[indexToEdit].word = word;
    tempCards[indexToEdit].definition = definition;
    setCards(tempCards);

    resetModal();
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-4 w-full">
        {cards.map((card, index) => (
          <button
            onClick={() => handleEditCard(index)}
            className="btn w-full h-fit btn-neutral text-start items-center justify-start py-2 px-4"
            key={card.id}
          >
            <h3 className="text-xl md:w-1/2 w-full whitespace-normal break-words">
              {card.word}
            </h3>
            <h4 className="md:text-xl text-md whitespace-normal break-words">
              {card.definition}
            </h4>
          </button>
        ))}
        <button
          className="btn btn-primary btn-outline w-full"
          onClick={handleNewCard}
        >
          New Card
        </button>
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
              <button
                className="btn btn-sm btn-circle btn-ghost absolute top-2 left-2"
                onClick={handleDeleteCard}
              >
                <FaRegTrashAlt />
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
