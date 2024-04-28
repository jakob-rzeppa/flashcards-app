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

  const onSave = async (name: string, description: string) => {
    await updateElement("stacks", data.id, { name, description });

    router.refresh();
  };

  const onReset = async () => {
    await resetCardLevels(cards);

    router.refresh();
  };

  const onDelete = () => {
    deleteElement("stacks", data.id);
    router.push("/library/folder?id=" + data.folder_id);
  };

  return (
    <Settings
      onSave={onSave}
      onDelete={onDelete}
      data={{ name: data.name, description: data.description }}
      buttonClassName="absolute top-2 right-2"
    >
      <button
        className="btn btn-warning btn-outline mb-4 w-full"
        onClick={onReset}
      >
        Reset Cards
      </button>
    </Settings>
  );
}

export default StackSettings;
