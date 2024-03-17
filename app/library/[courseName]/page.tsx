"use client";

import { useState } from "react";

import BackgroundBox from "@/components/BackgroundBox";
import List from "@/components/List";
import Button from "@/components/Button";

interface Props {
  params: { courseName: string };
}

function Course({ params }: Props) {
  const [folders, setFolders] = useState([
    {
      title: "testFolder",
      href: "/library/test/testFolder",
      descriptions: { Sets: 4, Cards: 94 },
    },
    {
      title: "testFolder",
      href: "/library/test/testFolder",
      descriptions: { Sets: 4, Cards: 94 },
    },
  ]);

  const addFolder = () => {
    // TODO pick name
  };

  return (
    <BackgroundBox>
      <h1 className="text-2xl font-bold mb-4">{params.courseName}</h1>
      <Button onClick={addFolder}>Create New Folder</Button>
      <List list={folders} />
    </BackgroundBox>
  );
}

export default Course;
