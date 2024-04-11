"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";

function PrevPageButton() {
  const router = useRouter();

  return (
    <button onClick={() => router.back()} className="btn btn-link">
      <IoIosArrowBack />
    </button>
  );
}

export default PrevPageButton;
