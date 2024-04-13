"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { FiArrowLeft } from "react-icons/fi";

interface Props {
  className?: string;
}

function NavButton({ className }: Props) {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <button
      className={`btn btn-circle btn-primary ${className}`}
      onClick={handleClick}
    >
      <FiArrowLeft />
    </button>
  );
}

export default NavButton;
