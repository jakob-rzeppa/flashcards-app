import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  params: { courseName: string };
}

function CourseLayout({ children, params }: Props) {
  return <div>{children}</div>;
}

export default CourseLayout;
