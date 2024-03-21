"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import BackgroundBox from "@/components/BackgroundBox";
import Button from "@/components/Button";
import getUserId from "@/utils/supabase/getUserId";
import { useRouter } from "next/navigation";
import { Database } from "@/supabase";

interface Props {
  params: { courseName: string };
}

function CoursePage({ params }: Props) {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const getData = async () => {
    const userId = getUserId();

    if (userId === null) {
      router.push("/login");
      return;
    }

    const { data: courses, error } = await supabase
      .from("courses")
      .select("*")
      .eq("owner_id", userId);

    return courses;
  };

  const data = getData();

  const addFolder = () => {
    // TODO pick name
  };

  return (
    <BackgroundBox>
      <h1 className="text-2xl font-bold mb-4">{params.courseName}</h1>
      <Button shape="box" onClick={addFolder}>
        Create New Folder
      </Button>
      {/*<List list={folders} />*/}
    </BackgroundBox>
  );
}

export default CoursePage;
