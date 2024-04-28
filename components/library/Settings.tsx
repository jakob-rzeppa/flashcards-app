"use client";

import React, { ReactNode, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import DeleteButton from "../DeleteButton";
import { useRouter } from "next/navigation";

interface Props {
  data: {
    name: string;
    description: string;
  };
  onSave: (name: string, description: string) => void;
  onDelete: () => void;
  children?: ReactNode;
  buttonClassName?: string;
}

function Settings({
  data,
  onSave,
  onDelete,
  children,
  buttonClassName,
}: Props) {
  const [name, setName] = useState(data.name);
  const [description, setDescription] = useState(data.description);

  return (
    <>
      <button
        className={`btn btn-circle ${buttonClassName}`}
        onClick={() =>
          (
            document.getElementById("settings_modal") as HTMLDialogElement
          ).showModal()
        }
      >
        <BsThreeDotsVertical size={20} />
      </button>

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
          {children}
          <DeleteButton onClick={onDelete} />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

export default Settings;
