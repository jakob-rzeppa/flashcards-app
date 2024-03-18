"use client";

import { usePathname, useRouter } from "next/navigation";
import React from "react";

import { IoMdArrowBack } from "react-icons/io";

const BackButton = () => {
  const router = useRouter();
  const pathname = usePathname();

  const onBack = () => {
    if (pathname !== "/") {
      router.back();
    }
  };

  return (
    <button
      onClick={onBack}
      className="flex items-center justify-center w-12 h-12 rounded-full bg-cover bg-center bg-no-repeat text-white bg-blue-600 focus:outline-none hover:brightness-75"
    >
      <IoMdArrowBack className="w-6 h-6" />
    </button>
  );
};

export default BackButton;
