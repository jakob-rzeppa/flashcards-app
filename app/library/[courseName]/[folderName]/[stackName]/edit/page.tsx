"use client";

import BackgroundBox from "@/components/BackgroundBox";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import Card from "./components/Card";

function Edit() {
  const pathname = usePathname();
  const splitPathname = pathname.split("/");
  const stackName = splitPathname[splitPathname.length - 2];

  const [cards, setCards] = useState([
    {
      word: "test",
      definition: "Test",
    },
  ]);
  return (
    <BackgroundBox>
      <h1 className="text-2xl font-bold mb-4">{"edit " + stackName}</h1>
      <h2 className="text-xl font-semibold mt-2">Words:</h2>
      <ul className="mt-2">
        {cards.map((card) => (
          <Card card={card} />
        ))}
      </ul>
    </BackgroundBox>
  );
}

export default Edit;
