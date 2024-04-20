"use client";

import React, { useState } from "react";

import Settings from "@/components/library/Settings";
import DeleteButton from "@/components/DeleteButton";
import { deleteElement } from "@/actions/library/client/deleteElement";
import { useRouter } from "next/navigation";
import updateElement from "@/actions/library/client/updateElement";
import resetCardLevels from "@/actions/cards/client/resetCardLevels";

function StackSettings({
  data,
  cards,
}: {
  data: {
    created_at: string;
    description: string;
    folder_id: number;
    id: number;
    name: string;
    owner_id: string;
  };
  cards: {
    created_at: string;
    definition: string;
    id: number;
    owner_id: string;
    stack_id: number;
    word: string;
  }[];
}) {
  const router = useRouter();

  const [name, setName] = useState(data.name);
  const [description, setDescription] = useState(data.description);

  const saveData = async () => {
    await updateElement("stacks", data.id, { name, description });

    router.refresh();
  };

  const reset = async () => {
    await resetCardLevels(cards);

    router.refresh();
  };

  return (
    <Settings>
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
      <button className="btn btn-primary mb-4 w-full" onClick={saveData}>
        Save
      </button>
      <button
        className="btn btn-warning btn-outline mb-4 w-full"
        onClick={reset}
      >
        Reset Cards
      </button>
      <DeleteButton
        onClick={() => {
          deleteElement("stacks", data.id);
          router.push("/library/folder?id=" + data.folder_id);
        }}
      />
    </Settings>
  );
}

export default StackSettings;
