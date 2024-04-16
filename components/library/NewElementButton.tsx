import React from "react";

interface Props {
  onClick: () => void;
  type: "course" | "folder" | "stack";
}

function NewElementButton({ onClick, type }: Props) {
  return (
    <button
      className="btn btn-primary"
      onClick={onClick}
    >{`New ${type}`}</button>
  );
}

export default NewElementButton;
