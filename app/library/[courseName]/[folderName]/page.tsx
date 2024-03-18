"use client";

import { useState } from "react";

import BackgroundBox from "@/components/BackgroundBox";
import List from "@/components/List";
import Button from "@/components/Button";

interface Props {
  params: { folderName: string };
}

function Folder({ params }: Props) {
  // TODO options like delete Folder, ...
  const [sets, setSets] = useState([
    {
      title: "testSet",
      href: "/library/test/testFolder/testSet",
      descriptions: { Sets: 4, Cards: 94 },
    },
  ]);

  const addSet = () => {
    // TODO pick name
  };

  return (
    <BackgroundBox>
      <h1 className="text-2xl font-bold mb-4">{params.folderName}</h1>
      <Button onClick={addSet}>Create New Set</Button>
      <List list={sets} />
    </BackgroundBox>
  );
}

export default Folder;
