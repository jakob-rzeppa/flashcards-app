"use client";

import React, { useState } from "react";
import { createClient } from "@/utils/supabase/client";
// import TinderCard from "react-tinder-card";

function LearnPage() {
  const supabase = createClient();

  // definition_lang, word_lang, ...
  const [settings, setSettings] = useState({});

  const [cards, setCards] = useState([]);

  const fetchCardsAndSettings = async () => {
    // setSettings
    // setCards
  };

  const nextCard = () => {
    // go to next card
  };

  const prevCard = () => {
    // go to previous card
  };

  // negative difference when wrong else positive
  const changeMasteryLevelOfCard = (difference: number) => {};

  const onLeftSwipe = () => {
    // difference = -2
    nextCard();
  };

  const onDownSwipe = () => {
    // difference = -1
    nextCard();
  };

  const onRightSwipe = () => {
    // difference = 1
    nextCard();
  };

  const flipCard = () => {
    // if word change to definition else to word
  };

  /*return (
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
  );*/
  return <div>LearnPage</div>;
}

export default LearnPage;
