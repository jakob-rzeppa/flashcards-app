"use client";

import React, { useState, useEffect, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import { IoChevronBack } from "react-icons/io5";
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

  const cardRef = useRef<{ resetCard: () => void }>(null);

  const [currentWord, setCurrentWord] = useState("word");
  const [currentDefinition, setCurrentDefinition] = useState("definition");

  const onSwipe = async (dir: "left" | "right" | "bottom") => {
    const nextIndex = currentIndex + 1;

    // TODO handle card change depending on dir

    // Next card
    setCurrentWord(cards[nextIndex].word);
    setCurrentDefinition(cards[nextIndex].definition);

    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    await sleep(500);
    cardRef.current?.resetCard();

    // update index
    setCurrentIndex(nextIndex);
  };

  return (
    <div>
      <button
        className="btn btn-circle z-50 absolute top-3 left-3"
        onClick={() => {
          if (cardRef.current) {
            cardRef.current.resetCard();
          }
        }}
      >
        <IoChevronBack />
      </button>
      <div>
        <SwipeCard
          data={{ word: currentWord, definition: currentDefinition }}
          onSwipe={onSwipe}
          ref={cardRef}
        />
      </div>
    </div>
  );
}

export default LearnPage;
