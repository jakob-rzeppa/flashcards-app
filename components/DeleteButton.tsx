import React from "react";

interface Props {
  onClick: () => void;
}

function DeleteButton({ onClick }: Props) {
  return (
    <>
      <button
        className="btn btn-error btn-outline w-full"
        onClick={() =>
          (
            document.getElementById("delete_modal") as HTMLDialogElement
          ).showModal()
        }
      >
        Delete
      </button>
      <dialog
        id="delete_modal"
        className="modal h-max bg-base-100 w-max m-auto p-8 rounded-box"
      >
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <p className="text-2xl mb-4">This action can't be undone!</p>
        <button className="btn btn-error" onClick={onClick}>
          Delete
        </button>
      </dialog>
    </>
  );
}

export default DeleteButton;
