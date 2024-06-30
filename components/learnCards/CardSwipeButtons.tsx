import React from "react";
import { dir } from "./BrowserCards";
import { FaArrowDown, FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface Props {
  onSwipe: (dir: dir) => void;
}

function CardSwipeButtons({ onSwipe }: Props) {
  return (
    <div className="flex flex-row justify-center items-center gap-4 absolute bottom-[10%] left-1/2 -translate-x-1/2 translate-y-1/2">
      <button
        className="btn btn-circle btn-outline btn-primary"
        onClick={() => onSwipe("left")}
      >
        <FaArrowLeft size={20} />
      </button>
      <button
        className="btn btn-circle btn-outline btn-primary"
        onClick={() => onSwipe("down")}
      >
        <FaArrowDown size={20} />
      </button>
      <button
        className="btn btn-circle btn-outline btn-primary"
        onClick={() => onSwipe("right")}
      >
        <FaArrowRight size={20} />
      </button>
    </div>
  );
}

export default CardSwipeButtons;
