import React, { RefObject } from "react";

import TinderCard from "react-tinder-card";

import FlipCard from "./FlipCard";

interface Props {
  onSwipe: (dir: string, index: number) => void;
  visible: boolean;
  word: string;
  definition: string;
  reference: RefObject<any>;
  index: number;
}

function SwipeCard({
  onSwipe,
  word,
  definition,
  visible,
  reference,
  index,
}: Props) {
  return (
    visible && (
      <TinderCard
        onSwipe={(dir) => onSwipe(dir, index)}
        preventSwipe={["up"]}
        ref={reference}
      >
        <FlipCard word={word} definition={definition} />
      </TinderCard>
    )
  );
}

export default SwipeCard;
