import React from "react";

import FoldersList from "@/app/(site)/library/course/FoldersList";
import getName from "@/actions/getName";
import NavButton from "@/components/navigation/NavButton";

interface Props {
  searchParams: { id: string };
}

async function CoursePage({ searchParams: { id } }: Props) {
  const name = await getName("courses", parseInt(id));

  return (
    <div className="flex flex-col gap-8 justify-center items-center mt-8 relative">
      <h1 className="text-4xl font-bold">{name}</h1>
      <FoldersList courseId={id} />
    </div>
  );
}

export default CoursePage;
