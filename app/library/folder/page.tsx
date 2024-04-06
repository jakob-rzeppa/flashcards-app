import React from "react";

interface Props {
  searchParams: {
    id: string;
  };
}

function page({ searchParams: { id } }: Props) {
  return <div>{id}</div>;
}

export default page;
