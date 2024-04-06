import React from "react";
import FoldersList from "@/components/library/FoldersList";

interface Props {
  searchParams: { id: string };
}

function CoursePage({ searchParams: { id } }: Props) {
  console.log(id);
  return (
    <div className="flex flex-col gap-8 justify-center items-center mt-8">
      <h1 className="text-4xl font-bold">{}</h1>
      <FoldersList courseId={id} />
    </div>
  );
}

export default CoursePage;
