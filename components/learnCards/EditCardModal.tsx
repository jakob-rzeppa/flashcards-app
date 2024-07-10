"use client";

import React, { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import Modal from "../ui/Modal";
import deleteCard from "@/actions/cards/client/deleteCard";
import updateCard from "@/actions/cards/client/updateCard";
import { useRouter } from "next/navigation";

export type EditCardData = {
  id: number;
  front: string;
  back: string;
} | null;

interface Props {
  data: EditCardData;
  setData: React.Dispatch<React.SetStateAction<EditCardData>>;
}

function EditCardModal({ data, setData }: Props) {
  const router = useRouter();

  const [front, setFront] = useState(data ? data.front : "");
  const [back, setBack] = useState(data ? data.back : "");

  const saveEditedCard = () => {
    if (!data) throw new Error("No card Id supplied!");
    updateCard(data.id, front, back);
    router.refresh();
  };

  const handleDeleteCard = () => {
    if (!data) throw new Error("No card Id supplied!");
    deleteCard(data.id);
    router.refresh();
  };

  return (
    <Modal onClose={() => setData(null)} isOpen={data ? true : false}>
      <form method="dialog">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute top-2 left-2"
          onClick={handleDeleteCard}
        >
          <FaRegTrashAlt />
        </button>
      </form>
      <textarea
        className="textarea textarea-primary w-full mt-8"
        id="front"
        placeholder="front"
        value={front}
        onChange={(e) => setFront(e.target.value)}
        autoFocus
      ></textarea>

      <textarea
        className="textarea textarea-primary h-[25vh] w-full mt-4"
        id="back"
        placeholder="back"
        value={back}
        onChange={(e) => setBack(e.target.value)}
      ></textarea>
      <form method="dialog">
        <button
          className="btn btn-neutral w-full mt-4"
          onClick={saveEditedCard}
        >
          Save
        </button>
      </form>
    </Modal>
  );
}

export default EditCardModal;
