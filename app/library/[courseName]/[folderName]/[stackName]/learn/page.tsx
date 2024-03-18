"use client";

import React from "react";

import { IoMdThumbsUp, IoMdThumbsDown } from "react-icons/io";

import BackgroundBox from "@/components/BackgroundBox";
import Button from "@/components/Button";

function Learn() {
  // TODO Responsive (Swipe, no Buttons)

  const onWrong = () => {
    // TODO
  };

  const onRight = () => {
    // TODO
  };

  const onTurn = () => {
    // TODO
  };

  return (
    <div className="grid-cols-[25%_50%_25%] grid">
      <div className="relative w-full">
        <Button
          onClick={onWrong}
          shape="round"
          classes="absolute top-1/2 -translate-y-1/2 right-1"
        >
          <IoMdThumbsDown />
        </Button>
      </div>
      <BackgroundBox>
        <div
          onClick={onTurn}
          className="w-full h-[75vh] relative bg-gray-100 rounded"
        >
          <span className="text-3xl absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2">
            test
          </span>
        </div>
      </BackgroundBox>
      <div className="relative">
        <Button
          onClick={onWrong}
          shape="round"
          classes="absolute top-1/2 -translate-y-1/2 left-1"
        >
          <IoMdThumbsUp />
        </Button>
      </div>
    </div>
  );
}

export default Learn;
