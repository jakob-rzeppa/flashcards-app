import { getCards } from "@/actions/cards/server/getCards";
import CardsManager from "@/components/learnCards/CardsManager";

interface Props {
  searchParams: {
    scope: "stack" | "folder" | "course" | "library";
    id: string;
  };
}

async function LearnPage({ searchParams: { scope, id } }: Props) {
  const allCards = await getCards(scope, parseInt(id));

  return <CardsManager cards={allCards} />;
}

export default LearnPage;
