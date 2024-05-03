"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import NavButton from "../navigation/NavButton";

interface CardData {
  created_at: string;
  definition: string;
  id: number;
  owner_id: string;
  stack_id: number;
  word: string;
}

interface Props {
  cards: CardData[];
  prevHref: string;
}
// TODO useContext
function CardsManager({ cards, prevHref }: Props) {
  const router = useRouter();
  const [currentCards, setCurrentCards] = useState<CardData[]>([]);

  return (
    <>
      <NavButton href={prevHref} className="absolute top-4 left-4" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    </>
  );
}

export default CardsManager;
