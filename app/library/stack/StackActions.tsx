import Link from "next/link";
import React from "react";

interface Props {
  id: string;
}

function StackActions({ id }: Props) {
  return (
    <div className="flex flex-col gap-4 w-3/5 md:flex-row">
      <Link
        href={"/learn?scope=stack&id=" + id}
        className="btn btn-primary flex-1"
      >
        Learn
      </Link>
      <Link
        href={"/library/stack/edit?id=" + id}
        className="btn btn-primary flex-1"
      >
        Edit
      </Link>
    </div>
  );
}

export default StackActions;
