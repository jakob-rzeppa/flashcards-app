"use client";

import React, { useState } from "react";
import Link from "next/link";
import EditCards from "./EditCards";

interface Props {
  cardsData: {
    created_at: string;
    definition: string;
    id: number;
    owner_id: string;
    stack_id: number;
    word: string;
  }[];
  id: number;
}

function StackContent({ cardsData, id }: Props) {
  return (
    <main className="md:w-3/5 w-4/5 mx-auto mt-4">
      <Link
        href={"/learn?scope=stack&id=" + id}
        className="btn btn-primary w-full"
      >
        Learn
      </Link>
      <h2 className="text-3xl font-semibold text-center mt-8 mb-4">Cards</h2>
      <EditCards data={cardsData} stackId={id} />
    </main>
  );
}

export default StackContent;
