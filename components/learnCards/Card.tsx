"use client";

import React, { useState } from "react";
import ReactTouchEvents from "react-touch-events";

import "./rotate.css";

interface Props {
  word: string;
  definition: string;
  onSwipe: (dir: "left" | "right" | "bottom") => void;
}

function Card({ word, definition, onSwipe }: Props) {
  const [cardPosition, setCardPosition] = useState({
    top: "50%",
    left: "50%",
    rotate: "0deg",
  });
  const [dragOffset, setDragOffset] = useState({ top: 0, left: 0 });
  const [isMouseDown, setIsMouseDown] = useState(false);

  const rotateCard = () => {
    const card = document.getElementById("card") as HTMLDivElement;
    card.classList.toggle("rotate");
  };

  const handleDrop = (event: React.MouseEvent) => {
    setIsMouseDown(false);
    const borders = {
      right: (window.innerWidth * 2) / 3,
      left: (window.innerWidth * 1) / 3,
      bottom: (window.innerHeight * 2) / 3,
    };
    const offsetToBorders = {
      right: event.clientX - dragOffset.left - borders.right,
      left: borders.left - dragOffset.left - event.clientX,
      bottom: event.clientY - dragOffset.top - borders.bottom,
    };
    if (
      offsetToBorders.right >= 0 &&
      offsetToBorders.bottom < offsetToBorders.right
    ) {
      onSwipe("right");
    } else if (
      offsetToBorders.left >= 0 &&
      offsetToBorders.bottom < offsetToBorders.left
    ) {
      onSwipe("left");
    } else if (offsetToBorders.bottom >= 0) {
      onSwipe("bottom");
    }
    setCardPosition({ top: "50%", left: "50%", rotate: "0deg" });
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    const currentOffset = {
      left: event.clientX - window.innerWidth / 2,
      top: event.clientY - window.innerHeight / 2,
    };
    setDragOffset(currentOffset);
    setIsMouseDown(true);
    const dim = document.getElementById("card")?.getBoundingClientRect();
    if (
      Math.abs(currentOffset.left) > dim?.width! / 2 ||
      Math.abs(currentOffset.top) > dim?.height! / 2
    ) {
      return;
    }
    setCardPosition({
      top: `${event.clientY - currentOffset.top}px`,
      left: `${event.clientX - currentOffset.left}px`,
      rotate: `${
        (((event.clientX - currentOffset.left) / window.innerWidth) * 100 -
          50) /
        4
      }deg`,
    });
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (isMouseDown)
      setCardPosition({
        top: `${event.clientY - dragOffset.top}px`,
        left: `${event.clientX - dragOffset.left}px`,
        rotate: `${
          (((event.clientX - dragOffset.left) / window.innerWidth) * 100 - 50) /
          4
        }deg`,
      });
  };

  return (
    <div
      className="w-screen h-screen"
      onMouseUp={handleDrop}
      onMouseMove={handleMouseMove}
    >
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 h-2/3 aspect-[2/3]"
        id="card_wrapper"
        style={cardPosition}
        onMouseDown={handleMouseDown}
      >
        <ReactTouchEvents onTap={rotateCard}>
          <div id="card" className="card bg-neutral relative w-full h-full">
            <div id="front" className="front absolute w-full h-full">
              <p className="text-3xl absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                {word}
              </p>
            </div>
            <div id="back" className="back rotate absolute w-full h-full">
              <p className="text-3xl absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                {definition}
              </p>
            </div>
          </div>
        </ReactTouchEvents>
      </div>
    </div>
  );
}

export default Card;
