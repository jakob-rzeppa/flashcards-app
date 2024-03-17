import React, { ReactNode } from "react";

interface Props {
  title: string;
}

function HeaderTitle({ title }: Props) {
  return <p className="text-2xl">{title}</p>;
}

export default HeaderTitle;
