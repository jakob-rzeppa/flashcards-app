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
