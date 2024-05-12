import getStackCards from "./getStackCards";
import getLibraryCards from "./getLibraryCards";
import getCourseCards from "./getCourseCards";
import getCardsToRepeat from "./getCardsToRepeat";
import { typeCards } from "@/types";

export async function getCards(
  method: "shortTermMemory" | "longTermMemory",
  scope: "stack" | "folder" | "course" | "library",
  id?: number
): Promise<typeCards> {
  let cards: typeCards = [];

  if (scope === "stack") {
    if (!id) {
      console.error("can't get cards, because no stackId supplied");
      return [];
    }

    const data = await getStackCards(id);

    cards = data;
  } else if (scope === "library") {
    const data = await getLibraryCards();

    cards = data;
  } else if (scope === "folder") {
    if (!id) {
      console.error("can't get cards, because no folderId supplied");
      return [];
    }

    const data = await getLibraryCards();

    cards = data;
  } else if (scope === "course" && id) {
    if (!id) {
      console.error("can't get cards, because no courseId supplied");
      return [];
    }

    const data = await getCourseCards(id);

    cards = data;
  }

  return method === "shortTermMemory" ? cards : getCardsToRepeat(cards);
}
