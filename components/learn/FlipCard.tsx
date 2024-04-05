import React from "react";
import ReactTouchEvents from "react-touch-events";

import BaseCard from "./BaseCard";
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
    <ReactTouchEvents onTap={onClick}>
      <div id="flip-card" className="flip-card h-[70vh] aspect-[2/3]">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <BaseCard content={word} />
          </div>
          <div className="flip-card-back">
            <BaseCard content={definition} />
          </div>
        </div>
      </div>
    </ReactTouchEvents>
  );
}

export default FlipCard;
