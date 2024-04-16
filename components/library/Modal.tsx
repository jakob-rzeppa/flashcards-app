"use client";

import React, { useState } from "react";

function Modal() {
  const [title, setTitle] = useState("");
  const [definition, setDefinition] = useState("");

  const resetModal = () => {
    setTitle("");
    setDefinition("");
  };

  const createElement = () => {
    // TODO
    resetModal();
  };

  return (
    <dialog id="edit_card_modal" className="modal">
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
            id="definition"
            placeholder="definition"
            value={definition}
            onChange={(e) => setDefinition(e.target.value)}
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
