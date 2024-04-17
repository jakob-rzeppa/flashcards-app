"use client";

import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { isMobile } from "react-device-detect";
import FlipCard from "./FlipCard";
import { IoChevronBack } from "react-icons/io5";

interface Props {
  data: { word: string; definition: string };
}

const SwipeCard = forwardRef(({ data }: Props, ref) => {
  // State to track mouse down event (includes touch start event)
  const [mouseDown, setMouseDown] = useState(false);

  // State to manage card position relative to the screen
  const [cardPos, setCardPos] = useState<{ x: number; y: number }>({
    x: 50,
    y: 50,
  });

  const [cardRotation, setCardRotation] = useState(0);

  const [onScreen, setOnScreen] = useState(true);

  // State to manage offset from position clicked to center of card
  const [offset, setOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  // function that can be called from the higher level component to reset the card
  function resetCard() {
    setOnScreen(true);
    setCardPos({ x: 50, y: 50 });
    setCardRotation(0);
  }

  useImperativeHandle(ref, () => ({ resetCard }));

  // Function to handle movement of the card
  const move = (x: number, y: number) => {
    const relativePos = {
      x: ((x + offset.x) / window.innerWidth) * 100,
      y: ((y + offset.y) / window.innerHeight) * 100,
    };
    setCardPos(relativePos);
    setCardRotation((relativePos.x - 50) / 2);
  };

  const moveTouch = (e: TouchEventInit) => {
    if (!e.touches || e.touches.length === 0) return;
    move(e.touches[0].clientX, e.touches[0].clientY);
  };

  const moveMouse = (e: MouseEventInit) => {
    if (e.clientX === undefined || e.clientY === undefined) return;
    move(e.clientX, e.clientY);
  };

  const handleSwipe = (dir: "left" | "right" | "bottom") => {
    setCardRotation(0);

    switch (dir) {
      case "right":
        setCardPos({ x: 150, y: 50 });
        break;
      case "left":
        setCardPos({ x: -50, y: 50 });
        break;
      case "bottom":
        setCardPos({ x: 50, y: 150 });
        break;
    }

    setOnScreen(false);
    //onSwipe(dir);
  };

  const handleDrop = () => {
    if (!onScreen) {
      return;
    }

    const card = document.getElementById("card-wrapper");
    if (!card) return;

    const borders = { right: 70, left: 30, bottom: 60 };
    const offsetToBorders = {
      right: cardPos.x - borders.right,
      left: borders.left - cardPos.x,
      bottom: cardPos.y - borders.bottom,
    };

    if (
      offsetToBorders.right >= 0 &&
      offsetToBorders.bottom < offsetToBorders.right
    ) {
      handleSwipe("right");
      return;
    }

    if (
      offsetToBorders.left >= 0 &&
      offsetToBorders.bottom < offsetToBorders.left
    ) {
      handleSwipe("left");
      return;
    }

    if (offsetToBorders.bottom >= 0) {
      handleSwipe("bottom");
      return;
    }

    setCardPos({ x: 50, y: 50 });
    setCardRotation(0);
  };

  useEffect(() => {
    const moveEvent = isMobile ? "touchmove" : "mousemove";

    if (mouseDown && onScreen) {
      document.addEventListener(
        moveEvent,
        isMobile ? moveTouch : moveMouse,
        true
      );
    }

    return () => {
      document.removeEventListener(
        moveEvent,
        isMobile ? moveTouch : moveMouse,
        true
      );
    };
  }, [mouseDown]);

  return (
    <>
      <button className="btn btn-circle z-50 absolute top-3 left-3">
        <IoChevronBack />
      </button>
      <div
        id="main"
        className="w-screen h-screen absolute top-0 left-0 overflow-hidden touch-none"
        onMouseUp={(e) => {
          setMouseDown(false);
          handleDrop();
        }}
        onTouchEnd={(e) => {
          setMouseDown(false);
          handleDrop();
        }}
      >
        <div
          id="card-wrapper"
          className="h-min w-min absolute -translate-x-1/2 -translate-y-1/2"
          style={{
            top: `${cardPos.y}vh`,
            left: `${cardPos.x}vw`,
            rotate: `${cardRotation}deg`,
            transition: "0.05s linear",
            transformOrigin: "top left",
          }}
          onMouseDown={(e) => {
            setMouseDown(true);
            setOffset({
              x: window.innerWidth! / 2 - e.clientX,
              y: window.innerHeight! / 2 - e.clientY,
            });
          }}
          onTouchStart={(e) => {
            setMouseDown(true);
            setOffset({
              x: window.innerWidth! / 2 - e.touches[0].clientX,
              y: window.innerHeight! / 2 - e.touches[0].clientY,
            });
          }}
        >
          <FlipCard word={data.word} definition={data.definition} />
        </div>
      </div>
    </>
  );
});

export default SwipeCard;
