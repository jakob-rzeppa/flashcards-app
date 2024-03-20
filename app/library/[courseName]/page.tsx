"use client";

import { useState } from "react";
import {
  createClientComponentClient,
  User,
} from "@supabase/auth-helpers-nextjs";

import BackgroundBox from "@/components/BackgroundBox";
import List from "@/components/List";
import Button from "@/components/Button";

interface Props {
  params: { courseName: string };
}

async function CoursePage({ params }: Props) {
  const supabase = createClientComponentClient();

  const user = await supabase.auth.getUser();
  const user_id = user.data.user!.id;

  const { data: courses, error } = await supabase
    .from("courses")
    .select("*")
    .eq("owner_id", user_id);

  console.log(courses);

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
      <Button shape="box" onClick={addFolder}>
        Create New Folder
      </Button>
      <List list={folders} />
    </BackgroundBox>
  );
}

export default CoursePage;
