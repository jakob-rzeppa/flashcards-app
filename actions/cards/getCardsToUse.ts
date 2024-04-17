export function getCardsToUse(
  allCards: { id: number; box: number }[],
  currentBox: number
) {
  const zerothBox = allCards.map((card) => {
    if (card.box === 0) {
      return card.id;
    }
  });

  const firstBox = allCards.map((card) => {
    if (card.box === 1) {
      return card.id;
    }
  });

  const secoundBox = allCards.map((card) => {
    if (card.box === 2) {
      return card.id;
    }
  });

  const thirdBox = allCards.map((card) => {
    if (card.box === 3) {
      return card.id;
    }
  });

  console.log(zerothBox, firstBox, secoundBox, thirdBox);
}
