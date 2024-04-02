import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import FlipCard from "./FlipCard";

const SwipeCard = () => {
  const containerWidth = window.innerWidth;
  const containerHeight = window.innerHeight;

  const [mouseDown, setMouseDown] = useState(false);
  const [cardPos, setCardPos] = useState({
    x: containerWidth! / 2,
    y: containerHeight! / 2,
  });
  const [cardRotation, setCardRotation] = useState(0);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  function move(x: number, y: number) {
    setCardPos({ x: x + offset.x, y: y + offset.y });

    const xPosInPercent = x / (containerWidth / 100);
    const xPosOffsetInPercent = xPosInPercent - 50;
    setCardRotation(xPosOffsetInPercent / 2);
  }

  function moveTouch(e: TouchEventInit) {
    if (!e.touches || e.touches.length === 0) return;
    move(e.touches[0].clientX, e.touches[0].clientY);
  }

  function moveMouse(e: MouseEventInit) {
    if (e.clientX === undefined || e.clientY === undefined) return;
    move(e.clientX, e.clientY);
  }

  function handleDrop() {
    const card = document.getElementById("card-wrapper");
    if (!card) return;

    const borders = {
      right: (containerWidth! * 2) / 3,
      left: containerWidth! / 3,
      bottom: (containerHeight! * 2) / 3,
    };
    const offsetToBorders = {
      right: cardPos.x - borders.right,
      left: borders.left - cardPos.x,
      bottom: cardPos.y - borders.bottom,
    };

    if (
      offsetToBorders.right >= 0 &&
      offsetToBorders.bottom < offsetToBorders.right
    ) {
      console.log("right");
      setCardPos({
        x: containerWidth + card.clientWidth,
        y: containerHeight / 2,
      });
      setCardRotation(0);
      return;
    }

    if (
      offsetToBorders.left >= 0 &&
      offsetToBorders.bottom < offsetToBorders.left
    ) {
      console.log("left");
      setCardPos({ x: -card.clientWidth, y: containerHeight / 2 });
      setCardRotation(0);
      return;
    }

    if (offsetToBorders.bottom >= 0) {
      console.log("bottom");
      setCardPos({
        x: containerWidth / 2,
        y: containerHeight + card.clientHeight,
      });
      setCardRotation(0);
      return;
    }

    setCardPos({ x: containerWidth! / 2, y: containerHeight! / 2 });
    setCardRotation(0);
  }

  useEffect(() => {
    const moveEvent = isMobile ? "touchmove" : "mousemove";

    if (mouseDown) {
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
    <div
      className="w-full h-full relative overflow-hidden"
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
          top: cardPos.y,
          left: cardPos.x,
          rotate: cardRotation + "deg",
          transition: "0.05s linear",
          transformOrigin: "top left",
        }}
        onMouseDown={(e) => {
          setMouseDown(true);
          setOffset({
            x: containerWidth! / 2 - e.clientX,
            y: containerHeight! / 2 - e.clientY,
          });
        }}
        onTouchStart={(e) => {
          setMouseDown(true);
          setOffset({
            x: containerWidth! / 2 - e.touches[0].clientX,
            y: containerHeight! / 2 - e.touches[0].clientY,
          });
        }}
      >
        <FlipCard word="word" definition="definition" />
      </div>
    </div>
  );
};

export default SwipeCard;
