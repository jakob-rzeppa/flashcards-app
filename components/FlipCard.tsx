import React from "react";
import "./FlipCardStyles.css";

interface Props {
  word: string;
  definition: string;
}

function FlipCard({ word, definition }: Props) {
  const onClick = () => {
    document.getElementById("flip-card")?.classList.toggle("flip-card-clicked");
  };

  return (
    <div
      onClick={onClick}
      id="flip-card"
      className="flip-card absolute top-[15vh] left-1/2 -translate-x-1/2 h-[70vh] aspect-[2/3]"
    >
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <div className="card bg-white w-full h-full">
            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl">
              {word}
            </p>
          </div>
        </div>
        <div className="flip-card-back">
          <div className="card bg-white w-full h-full">
            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl">
              {definition}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlipCard;
