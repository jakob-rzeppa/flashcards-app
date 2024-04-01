import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import FlipCard from "./FlipCard";

const SwipeCard = () => {
  useEffect(() => {
    gsap.set("#flip-card", {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      xPercent: -50,
      yPercent: -50,
    });

    function move(e: MouseEvent) {
      gsap.to("#flip-card", {
        duration: 0.5,
        x: e.clientX,
        y: e.clientY,
        ease: "power1.out",
        overwrite: "auto",
        stagger: 0.02,
      });
    }

    document.body.onmousedown = () => {
      window.addEventListener("mousemove", move);
    };

    document.body.onmouseup = () => {
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <>
      <div className="min-h-screen">
        <FlipCard word="word" definition="definition" />
      </div>
    </>
  );
};

export default SwipeCard;
