import React from "react";
import FoldersList from "@/components/library/FoldersList";

interface Props {
  params: { courseId: string };
}

function CoursePage({ params: { courseId } }: Props) {
  return (
    <div className="flex flex-col gap-8 justify-center items-center mt-8">
      <h1 className="text-4xl font-bold">{}</h1>
      <FoldersList courseId={courseId} />
    </div>
  );
}

export default CoursePage;
