"use client";

import createElement from "@/actions/library/createElement";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface Props {
  type: "course" | "folder" | "stack";
  id?: number;
}

function NewElement({ type, id }: Props) {
  const router = useRouter();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const resetModal = () => {
    setTitle("");
    setDescription("");
  };

  const handleOnSave = () => {
    createElement(type, id, title, description);
    resetModal();
    router.refresh();
  };

  return (
    <div>
      <button
        className="btn btn-primary"
        onClick={() =>
          (document.getElementById("modal") as HTMLDialogElement).showModal()
        }
      >
        New course
      </button>
      <dialog id="modal" className="modal">
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
              placeholder="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className="input input-primary"
              type="text"
              id="description"
              placeholder="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <form method="dialog">
              <button className="btn btn-neutral w-full" onClick={handleOnSave}>
                Save
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default NewElement;
