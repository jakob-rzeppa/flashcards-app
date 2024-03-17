import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  params: { courseName: string };
}

function CourseLayout({ children, params }: Props) {
  return (
    <div>
      <h1 className="text-center text-3xl font-bold">{params.courseName}</h1>
      {children}
    </div>
  );
}

export default CourseLayout;
