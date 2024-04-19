"use client";

import Card from "./Card";

interface Props {}

function Content({}: Props) {
  return (
    <div>
      <Card
        word="word"
        definition="definition"
        onSwipe={(dir) => console.log(dir)}
      />
    </div>
  );
}

export default Content;
