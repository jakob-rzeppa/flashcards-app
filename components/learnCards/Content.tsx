"use client";

import React from "react";

import "./styles.css";

interface Props {}

function Content({}: Props) {
  const rotate = () => {
    const card = document.getElementById("card") as HTMLDivElement;

    card.classList.toggle("rotate");
  };

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2/3 aspect-[2/3]">
      <div id="card" className="card bg-neutral relative w-full h-full">
        <div
          id="front"
          className="front absolute w-full h-full"
          onClick={rotate}
        >
          <p className="text-3xl absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
            front
          </p>
        </div>
        <div
          id="back"
          className="back rotate absolute w-full h-full"
          onClick={rotate}
        >
          <p className="text-3xl absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
            back
          </p>
        </div>
      </div>
    </div>
  );
}

export default Content;
