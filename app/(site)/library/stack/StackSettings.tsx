"use client";

import React, { useState } from "react";

import Settings from "@/components/library/Settings";
import DeleteButton from "@/components/DeleteButton";
import { deleteElement } from "@/actions/library/deleteElement";
import { useRouter } from "next/navigation";
import updateElement from "@/actions/library/updateElement";

function StackSettings({
  data,
}: {
  data: {
    created_at: string;
    description: string;
    folder_id: number;
    id: number;
    name: string;
    owner_id: string;
  };
}) {
  const router = useRouter();

  const [name, setName] = useState(data.name);
  const [description, setDescription] = useState(data.description);

  const saveData = async () => {
    const res = await updateElement("stacks", data.id, { name, description });

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
