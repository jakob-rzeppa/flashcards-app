import React from "react";

import FoldersList from "@/app/library/course/FoldersList";

interface Props {
  searchParams: { id: string };
}

function CoursePage({ searchParams: { id } }: Props) {
  return (
    <div className="flex flex-col gap-8 justify-center items-center mt-8">
      <h1 className="text-4xl font-bold">{}</h1>
      <FoldersList courseId={id} />
    </div>
  );
}

export default CoursePage;
