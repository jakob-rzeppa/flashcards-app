"use client";

import React, { useState } from "react";

interface Props {
  id: string;
  type: "course" | "folder" | "stack";
}

function Modal({ id, type }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const resetModal = () => {
    setTitle("");
    setDescription("");
  };

  const createElement = () => {
    // TODO
    console.log(type, title, description);
    resetModal();
  };

  return (
    <dialog id={id} className="modal">
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
            <button className="btn btn-neutral w-full" onClick={createElement}>
              Save
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default Modal;
