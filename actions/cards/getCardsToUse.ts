export function getCardsToUse(
  allCards: { id: number; box: number }[],
  currentBox: number
) {
  let zerothBoxMax = 0;
  let firstBoxMax = 0;
  let secoundBoxMax = 0;
  let thirdBoxMax = 0;

  let zerothBox = 0;
  let firstBox = 0;
  let secoundBox = 0;
  let thirdBox = 0;

  switch (currentBox) {
    case 0:
      zerothBoxMax = 20;
      firstBoxMax = 5;
      secoundBoxMax = 3;
      thirdBoxMax = 1;
      break;
    case 1:
      firstBoxMax = 20;
      secoundBoxMax = 5;
      thirdBoxMax = 3;
      break;
    case 2:
      secoundBoxMax = 20;
      thirdBoxMax = 5;
      break;
    case 3:
      thirdBoxMax = 20;
      break;
  }

  const cards: number[] = [];

  allCards.forEach((card) => {
    switch (card.box) {
      case 0:
        if (zerothBox < zerothBoxMax) {
          cards.push(card.id);
          zerothBox++;
        }
        break;
      case 1:
        if (firstBox < firstBoxMax) {
          cards.push(card.id);
          firstBox++;
        }
        break;
      case 2:
        if (secoundBox < secoundBoxMax) {
          cards.push(card.id);
          secoundBox++;
        }
        break;
      case 3:
        if (thirdBox < thirdBoxMax) {
          cards.push(card.id);
          thirdBox++;
        }
        break;
    }
  });

  console.log(cards);
}
