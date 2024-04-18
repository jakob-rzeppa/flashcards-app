"use client";

import React, { ReactNode } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

interface Props {
  children: ReactNode;
}

function Settings({ children }: Props) {
  return (
    <>
      <button
        className="btn btn-circle btn-primary absolute right-8"
        onClick={() =>
          (
            document.getElementById("settings_modal") as HTMLDialogElement
          ).showModal()
        }
      >
        <BsThreeDotsVertical size={20} />
      </button>
      <dialog id="settings_modal" className="modal">
        <div className="modal-box">{children}</div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

export default Settings;
