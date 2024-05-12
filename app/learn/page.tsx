import { getCards } from "@/actions/cards/server/getCards";
import CardsManager from "@/components/learnCards/CardsManager";

interface Props {
  searchParams: {
    id?: string;
    method: "shortTermMemory" | "longTermMemory";
  };
}

async function LearnPage({ searchParams: { id, method } }: Props) {
  const cards = id
    ? await getCards(method, parseInt(id))
    : await getCards(method);

  const prevHref = "/library/stack?id=" + id;

  return <CardsManager cards={cards} prevHref={prevHref} />;
}

export default LearnPage;
