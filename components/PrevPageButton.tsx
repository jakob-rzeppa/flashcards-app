"use client";

import React from "react";

import { IoIosArrowBack } from "react-icons/io";

import Button from "./Button";
import { useRouter } from "next/navigation";

function PrevPageButton() {
  const router = useRouter();

  const handleReturnToPrevPage = () => {
    router.back();
  };

  return (
    <Button onClick={handleReturnToPrevPage}>
      <IoIosArrowBack />
    </Button>
  );
}

export default PrevPageButton;
