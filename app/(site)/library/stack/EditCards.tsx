"use client";

import React, { useState } from "react";

import { FaRegTrashAlt } from "react-icons/fa";

import updateCard from "@/actions/cards/client/updateCard";
import createCard from "@/actions/cards/client/createCard";
import deleteCard from "@/actions/cards/client/deleteCard";
import { typeCards } from "@/types";

interface Props {
  data: typeCards;
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
    setWord(cards[index] ? cards[index].front : "");
    setDefinition(cards[index] ? cards[index].back : "");
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
      word === (cards[indexToEdit] ? cards[indexToEdit].front : "") &&
      definition === (cards[indexToEdit] ? cards[indexToEdit].back : "")
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
    tempCards[indexToEdit].front = word;
    tempCards[indexToEdit].back = definition;
    setCards(tempCards);

    resetModal();
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4 w-full">
        {cards.map((card, index) => (
          <button
            onClick={() => handleEditCard(index)}
            className="btn w-full h-fit text-start items-center justify-start py-2 px-4 flex flex-nowrap md:flex-row flex-col gap-4"
            key={card.id}
          >
            <h3 className="text-xl flex-1 whitespace-normal break-words">
              {card.front}
            </h3>
            <h4 className="md:text-xl text-md flex-1 whitespace-normal break-words ">
              {card.back}
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
          <div className="flex flex-col gap-4 m-6">
            <form method="dialog">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute top-2 left-2"
                onClick={handleDeleteCard}
              >
                <FaRegTrashAlt />
              </button>
            </form>
            <textarea
              className="textarea textarea-primary"
              id="word"
              placeholder="word"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              autoFocus
            ></textarea>

            <textarea
              className="textarea textarea-primary h-[25vh]"
              id="definition"
              placeholder="definition"
              value={definition}
              onChange={(e) => setDefinition(e.target.value)}
            ></textarea>
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

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

export default EditCards;
