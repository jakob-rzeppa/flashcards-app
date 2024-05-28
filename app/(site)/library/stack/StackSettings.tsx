"use client";

import React from "react";
import { useRouter } from "next/navigation";

import Settings from "@/components/library/Settings";
import resetCardLevels from "@/actions/cards/client/resetCardLevels";
import updateStack from "@/actions/library/client/updateStack";
import { typeCards, typeStack } from "@/types";
import { deleteStack } from "@/actions/library/client/deleteStack";

function StackSettings({ data, cards }: { data: typeStack; cards: typeCards }) {
  const router = useRouter();

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
    <Settings
      onSave={onSave}
      onDelete={onDelete}
      data={{ name: data.name, description: data.description }}
      buttonClassName="absolute top-2 right-2"
    >
      <button
        onClick={onReset}
        className="btn btn-warning btn-outline w-full mb-4"
      >
        Reset Cards
      </button>
    </Settings>
  );
}

export default StackSettings;
