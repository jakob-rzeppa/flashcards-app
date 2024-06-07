"use client";

import React, { useState } from "react";

interface Props {
  parentFolderId: number | null;
}

function NewLibraryElements({ parentFolderId }: Props) {
  const [typeOfElementToCreate, setTypeOfElementToCreate] = useState<
    "folder" | "stack"
  >("folder");
  const [newElementName, setNewElementName] = useState("");

  const createNewElement = () => {};

  return (
    <>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setTypeOfElementToCreate("folder");
              (
                document.getElementById(
                  "newLibraryElementModal"
                ) as HTMLDialogElement
              ).showModal();
            }}
          >
            new folder
          </button>
        </li>
        <li>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setTypeOfElementToCreate("stack");
              (
                document.getElementById(
                  "newLibraryElementModal"
                ) as HTMLDialogElement
              ).showModal();
            }}
          >
            new stack
          </button>
        </li>
      </ul>
      <dialog id="newLibraryElementModal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Create new {typeOfElementToCreate}
          </h3>
          <input
            type="text"
            className="input input-md input-primary w-full"
            value={newElementName}
            onChange={(e) => setNewElementName(e.target.value)}
          />

          <form method="dialog">
            <button
              className="btn btn-primary w-full mt-4"
              onClick={createNewElement}
            >
              Create
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

export default NewLibraryElements;
