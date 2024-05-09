import { getCards } from "@/actions/cards/server/getCards/getCards";
import CardsManager from "@/components/learnCards/CardsManager";

interface Props {
  searchParams: {
    scope: "stack" | "folder" | "course" | "library";
    id?: string;
    method: "shortTermMemory" | "longTermMemory";
  };
}

async function LearnPage({ searchParams: { scope, id, method } }: Props) {
  const cards = id
    ? await getCards(method, scope, parseInt(id))
    : await getCards(method, scope);

  let prevHref = "/library/";
  switch (scope) {
    case "course":
      prevHref += "course?id=" + id;
      break;
    case "folder":
      prevHref += "folder?id=" + id;
      break;
    case "stack":
      prevHref += "stack?id=" + id;
  }

  return <CardsManager cards={cards} prevHref={prevHref} />;
}

export default LearnPage;
