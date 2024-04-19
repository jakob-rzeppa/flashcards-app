"use client";

import React, { useEffect, useState } from "react";
import ReactTouchEvents from "react-touch-events";

import "./styles.css";

interface Props {}

function Content({}: Props) {
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

  const onMouseDown = (event: MouseEvent) => {
    offset = {
      left: event.clientX - window.innerWidth / 2,
      top: event.clientY - window.innerHeight / 2,
    };

    setPos({
      top: `${event.clientY - offset.top}px`,
      left: `${event.clientX - offset.left}px`,
      rotate: `${
        (((event.clientX - offset.left) / window.innerWidth) * 100 - 50) / 4
      }deg`,
    });
    mouseDown = true;
  };

  const onMouseUp = () => {
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
    <div className="w-full h-full">
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 h-2/3 aspect-[2/3]"
        id="card_wrapper"
        style={pos}
      >
        <ReactTouchEvents onTap={rotate}>
          <div id="card" className="card bg-neutral relative w-full h-full">
            <div id="front" className="front absolute w-full h-full">
              <p className="text-3xl absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                front
              </p>
            </div>
            <div id="back" className="back rotate absolute w-full h-full">
              <p className="text-3xl absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                back
              </p>
            </div>
          </div>
        </ReactTouchEvents>
      </div>
    </div>
  );
}

export default Content;
