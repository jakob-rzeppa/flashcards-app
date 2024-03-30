"use client";

import React, { useState, createRef, Ref, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import TinderCard from "react-tinder-card";
import FlipCard from "@/components/FlipCard";
import SwipeCard from "@/components/learn/SwipeCard";

function LearnPage() {
  const supabase = createClient();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [cards, setCards] = useState<
    {
      created_at: string;
      definition: string;
      id: number;
      owner_id: string | null;
      word: string;
    }[]
  >([]);

  // Handle different senarios
  const fetchCards = async () => {
    const { data, error } = await supabase.from("cards").select("*");

    if (error) {
      throw error;
    } else {
      console.log(data);
      setCards(data);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const [cardRefs, setCardRefs] = useState(cards.map(() => createRef<any>()));

  const nextCard = () => {
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);

    if (nextIndex >= cards.length) {
      console.log("no more cards");
    }
  };

  const prevCard = async () => {
    //TODO references not working
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;

      await cardRefs[prevIndex].current.restoreCard();
      setCurrentIndex(prevIndex);
    }
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

  /*return (
    <>
      <div className="w-screen h-screen">
        <button onClick={prevCard}>back</button>
        {cards.map((data, index) => (
          <div key={index}>
            <SwipeCard
              word={data.word}
              definition={data.definition}
              visible={currentIndex === index ? true : false}
              index={index}
              onSwipe={onSwipe}
              reference={cardRefs[index]}
            />
          </div>
        ))}
      </div>
    </>
  );*/
  return (
    <div>
      <SwipeCard />
    </div>
  );
}

export default LearnPage;
