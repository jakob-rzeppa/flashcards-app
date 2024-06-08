"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import resetCardLevels from "@/actions/cards/client/resetCardLevels";
import updateStack from "@/actions/library/client/updateStack";
import { typeCards, typeStack } from "@/types";
import { deleteStack } from "@/actions/library/client/deleteStack";
import { BsThreeDotsVertical } from "react-icons/bs";
import DeleteButton from "@/components/DeleteButton";

function StackSettings({ data, cards }: { data: typeStack; cards: typeCards }) {
  const router = useRouter();

  const [name, setName] = useState(data.name);
  const [description, setDescription] = useState(data.description);

  const onSave = async (name: string, description: string) => {
    await updateStack(data.id, { name, description });

    router.refresh();
  };

  const onReset = async () => {
    await resetCardLevels(cards);

    router.refresh();
  };

  const onDelete = () => {
    deleteStack(data.id);
    router.push("/library/");
  };

  return (
    <>
      <div className="w-full relative h-max">
        <button
          className="btn btn-circle m-4 float-end"
          onClick={() =>
            (
              document.getElementById("settings_modal") as HTMLDialogElement
            ).showModal()
          }
        >
          <BsThreeDotsVertical size={20} />
        </button>
      </div>

      <dialog id="settings_modal" className="modal">
        <div className="modal-box">
          <p>Name:</p>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered mb-4 w-full"
          />
          <p>Description:</p>
          <input
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input input-bordered mb-4 w-full"
          />
          <button
            className="btn btn-primary mb-4 w-full"
            onClick={() => onSave(name, description)}
          >
            Save
          </button>
          <button
            onClick={onReset}
            className="btn btn-warning btn-outline w-full mb-4"
          >
            Reset Cards
          </button>
          <DeleteButton onClick={onDelete} />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

export default StackSettings;
