"use client";

import React, { useState, createRef, Ref, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import TinderCard from "react-tinder-card";

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

  const swiper = createRef<any>();

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

  const cardRefs = cards.map(() => createRef<any>());

  const nextCard = () => {
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);

    if (nextIndex >= cards.length) {
      console.log("no more cards");
    }
  };

  const prevCard = async () => {
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

  return (
    <>
      <div className="w-screen h-screen">
        <button onClick={prevCard}>back</button>
        {cards.map((data, index) => (
          <div key={index}>
            <TinderCard
              onSwipe={(dir) => onSwipe(dir, index)}
              preventSwipe={["up"]}
              ref={cardRefs[index]}
            >
              <div className="card bg-white absolute top-[15vh] left-1/2 -translate-x-1/2 h-[70vh] aspect-[2/3]">
                <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl">
                  Word
                </p>
              </div>
            </TinderCard>
          </div>
        ))}
      </div>
    </>
  );
}

export default LearnPage;
