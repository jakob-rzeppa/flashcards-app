import React, { useEffect, useState } from "react";
import FlipCard from "./FlipCard";

const SwipeCard = () => {
  const [mouseDown, setMouseDown] = useState(false);

  const [cardPos, setCardPos] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  const [offset, setOffset] = useState({ x: 0, y: 0 });

  function move(e: any) {
    setCardPos({ x: e.clientX + offset.x, y: e.clientY + offset.y });
  }

  function handleDrop(e: any) {
    const card = document.getElementById("card-wrapper");

    if (!card) {
      console.log("Cant find card-wrapper!");
      return;
    }

    const borders = {
      right: (window.innerWidth * 2) / 3,
      left: window.innerWidth / 3,
      bottom: (window.innerHeight * 2) / 3,
    };

    const offsetToBorders = {
      right: e.clientX + offset.x - borders.right,
      left: borders.left - e.clientX + offset.x,
      bottom: e.clientY + offset.y - borders.right,
    };

    console.log(offsetToBorders);

    if (
      offsetToBorders.right >= 0 &&
      offsetToBorders.bottom < offsetToBorders.right
    ) {
      console.log("right");
      return;
    }

    if (
      offsetToBorders.left >= 0 &&
      offsetToBorders.bottom < offsetToBorders.left
    ) {
      console.log("left");
      return;
    }

    if (offsetToBorders.bottom >= 0) {
      console.log("bottom");
      return;
    }

    setCardPos({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });
  }

  useEffect(() => {
    if (mouseDown) {
      document.addEventListener("mousemove", move, true);
    }
    return () => {
      // Cleanup function to remove event listener when component unmounts or mouseDown changes.
      document.removeEventListener("mousemove", move, true);
    };
  }, [mouseDown]);

  return (
    <>
      <div
        className="h-screen w-screen"
        onMouseUp={(e) => {
          setMouseDown(false);
          handleDrop(e);
        }}
      >
        <div
          id="card-wrapper"
          className="h-min w-min absolute -translate-x-1/2 -translate-y-1/2"
          style={{ top: cardPos.y, left: cardPos.x }}
          onMouseDown={(e) => {
            setMouseDown(true);
            setOffset({
              x: window.innerWidth / 2 - e.clientX,
              y: window.innerHeight / 2 - e.clientY,
            });
          }}
        >
          <FlipCard word="word" definition="definition" />
        </div>
      </div>
    </>
  );
};

export default SwipeCard;
