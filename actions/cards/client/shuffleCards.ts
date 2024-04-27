interface CardData {
  created_at: string;
  definition: string;
  id: number;
  owner_id: string;
  stack_id: number;
  word: string;
}

// Fisher-Yates Sorting Algorithm
export default function shuffleCards(cards: CardData[]) {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  return cards;
}
