import React, { ReactNode } from "react";

interface Props {
  id: string;
  children: ReactNode;
}

function Modal({ id, children }: Props) {
  return (
    <dialog id={id} className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        {children}
      </div>
    </dialog>
  );
}

export default Modal;
