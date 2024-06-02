import { currentCardsContext } from "@/components/learnCards/CardsManager";
import { useContext } from "react";

export default function useCurrentCardsContext() {
  const context = useContext(currentCardsContext);
  if (!context) {
    throw new Error(
      "currentCardsContext has to be used within the context provider"
    );
  }

  return context;
}
