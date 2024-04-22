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
  let offset = { top: 0, left: 0 };
  let mouseDown = false;

  const onMouseMove = (event: MouseEvent) => {
    if (mouseDown) {
      setPos({
        top: `${event.clientY - offset.top}px`,
        left: `${event.clientX - offset.left}px`,
        rotate: `${
          (((event.clientX - offset.left) / window.innerWidth) * 100 - 50) / 4
        }deg`,
      });
    }
  };
  const handleDrop = (event: MouseEvent) => {
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

  const onMouseDown = (event: MouseEvent) => {
    offset = {
      left: event.clientX - window.innerWidth / 2,
      top: event.clientY - window.innerHeight / 2,
    };

    const dim = document.getElementById("card")?.getBoundingClientRect();

    if (
      Math.abs(offset.left) > dim?.width! / 2 ||
      Math.abs(offset.top) > dim?.height! / 2
    ) {
      return;
    }

    setPos({
      top: `${event.clientY - offset.top}px`,
      left: `${event.clientX - offset.left}px`,
      rotate: `${
        (((event.clientX - offset.left) / window.innerWidth) * 100 - 50) / 4
      }deg`,
    });

    mouseDown = true;
  };

  const onMouseUp = (event: MouseEvent) => {
    if (mouseDown) handleDrop(event);
    mouseDown = false;
  };

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);

    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);

      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    <div className="w-screen h-screen">
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 h-2/3 aspect-[2/3]"
        id="card_wrapper"
        style={pos}
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
