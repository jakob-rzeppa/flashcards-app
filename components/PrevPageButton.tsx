"use client";

import React from "react";

import { IoIosArrowBack } from "react-icons/io";

import { useRouter } from "next/navigation";

function PrevPageButton() {
  const router = useRouter();

  const handleReturnToPrevPage = () => {
    router.back();
  };

  return (
    <button onClick={handleReturnToPrevPage} className="btn btn-link">
      <IoIosArrowBack />
    </button>
  );
}

export default PrevPageButton;
