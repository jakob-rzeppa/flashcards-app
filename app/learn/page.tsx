import { getCards } from "@/actions/cards/server/getCards";
import CardsManager from "@/components/learnCards/CardsManager";

interface Props {
  searchParams: {
    scope: "stack" | "folder" | "course" | "library";
    id?: string;
  };
}

async function LearnPage({ searchParams: { scope, id } }: Props) {
  const cards = id
    ? await getCards(scope, parseInt(id))
    : await getCards(scope);

  console.log(cards);

  return <CardsManager cards={cards} />;
}

export default LearnPage;
