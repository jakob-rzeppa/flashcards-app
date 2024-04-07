import React from "react";

interface Props {
  cards: {
    created_at: string;
    definition: string;
    id: number;
    owner_id: string | null;
    stack_id: number;
    word: string;
  }[];
  masteryLevel: {
    card_id: number;
    level: number;
    user_id: string;
  }[];
}

function EditCards({ cards, masteryLevel }: Props) {
  return <div>EditCards</div>;
}

export default EditCards;
