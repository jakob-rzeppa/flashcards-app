"use client";

import React, { useState, createRef } from "react";
import { createClient } from "@/utils/supabase/client";
import TinderCard from "react-tinder-card";

declare type Direction = "left" | "right" | "up" | "down";

function LearnPage() {
  const supabase = createClient();

  // definition_lang, word_lang, ...
  const [settings, setSettings] = useState({});

  const [cards, setCards] = useState([]);

  const swiper = createRef<any>();

  const fetchCardsAndSettings = async () => {
    // setSettings
    // setCards
  };

  const nextCard = () => {
    // go to next card
  };

  const prevCard = async () => {
    console.log("restore card");
    await swiper.current.restoreCard();
  };

  const changeMastery = (change: number, index: number) => {
    // cant go under 0
    console.log(change);
  };

  const onSwipe = (direction: string, index: number) => {
    switch (direction) {
      case "left":
        changeMastery(-1, index);
        break;

      case "right":
        changeMastery(1, index);
        break;

      default:
        // dont change the mastery level of the card
        break;
    }

    nextCard();
  };

  const flipCard = () => {
    // if word change to definition else to word
  };

  return (
    <>
      <div className="w-screen h-screen">
        <button onClick={prevCard}>back</button>
        <TinderCard
          onSwipe={(dir) => onSwipe(dir, 0)}
          preventSwipe={["up"]}
          ref={swiper}
        >
          <div className="card bg-white absolute top-[15vh] left-1/2 -translate-x-1/2 h-[70vh] aspect-[2/3]">
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
