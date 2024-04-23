"use client";

import React, { useEffect, useState } from "react";
import ReactTouchEvents from "react-touch-events";

import "./rotate.css";

interface Props {
  word: string;
  definition: string;
  onSwipe: (dir: "left" | "right" | "bottom") => void;
}

function Card({ word, definition, onSwipe }: Props) {
  // ---- ROTATE ----
  const rotate = () => {
    const card = document.getElementById("card") as HTMLDivElement;

    card.classList.toggle("rotate");
  };

  // ---- MOVE ----
  const [pos, setPos] = useState({ top: "50%", left: "50%", rotate: "0deg" });
  let [offset, setOffset] = useState({ top: 0, left: 0 });

  const onMouseMove = (event: React.MouseEvent) => {
    if (event.buttons === 1)
      setPos({
        top: `${event.clientY - offset.top}px`,
        left: `${event.clientX - offset.left}px`,
        rotate: `${
          (((event.clientX - offset.left) / window.innerWidth) * 100 - 50) / 4
        }deg`,
      });
  };

  const handleDrop = (event: React.MouseEvent) => {
    const borders = {
      right: (window.innerWidth * 2) / 3,
      left: (window.innerWidth * 1) / 3,
      bottom: (window.innerHeight * 2) / 3,
    };
    const offsetToBorders = {
      right: event.clientX - offset.left - borders.right,
      left: borders.left - offset.left - event.clientX,
      bottom: event.clientY - offset.top - borders.bottom,
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

    setPos({ top: "50%", left: "50%", rotate: "0deg" });
  };

  const onMouseDown = (event: React.MouseEvent) => {
    const currentOffset = {
      left: event.clientX - window.innerWidth / 2,
      top: event.clientY - window.innerHeight / 2,
    };

    setOffset(currentOffset);

    const dim = document.getElementById("card")?.getBoundingClientRect();

    if (
      Math.abs(currentOffset.left) > dim?.width! / 2 ||
      Math.abs(currentOffset.top) > dim?.height! / 2
    ) {
      return;
    }

    setPos({
      top: `${event.clientY - currentOffset.top}px`,
      left: `${event.clientX - currentOffset.left}px`,
      rotate: `${
        (((event.clientX - currentOffset.left) / window.innerWidth) * 100 -
          50) /
        4
      }deg`,
    });
  };

  function onMouseUp(event: React.MouseEvent) {
    handleDrop(event);
  }

  return (
    <div
      className="w-screen h-screen"
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
    >
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 h-2/3 aspect-[2/3]"
        id="card_wrapper"
        style={pos}
        onMouseDown={onMouseDown}
      >
        <ReactTouchEvents onTap={rotate}>
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
