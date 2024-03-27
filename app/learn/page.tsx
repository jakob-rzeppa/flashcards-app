"use client";

import React from "react";
import TinderCard from "react-tinder-card";

function LearnPage() {
  return (
    <>
      <div className="relative mx-auto mt-[15vh] h-[70vh] aspect-[2/3]">
        <TinderCard>
          <div className="card w-full h-full bg-neutral absolute">
            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl">
              Word
            </p>
          </div>
        </TinderCard>
      </div>
    </>
  );
}

export default LearnPage;
