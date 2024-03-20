"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { IoMdLogIn } from "react-icons/io";

interface Props {
  backgroundImageUrl?: string;
}

const AccountButton = ({ backgroundImageUrl }: Props) => {
  // TODO Fetch User Profile Picture; Display Login when not logged in; add functionality

  const router = useRouter();

  const onClick = () => {
    // TODO logged in
    router.push("/login");
  };

  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center w-12 h-12 rounded-full bg-cover bg-center bg-no-repeat text-white bg-blue-600 focus:outline-none hover:brightness-75"
      style={{
        backgroundImage: backgroundImageUrl
          ? `url(${backgroundImageUrl})`
          : "none",
      }}
    >
      {!backgroundImageUrl && <IoMdLogIn className="w-6 h-6" />}
    </button>
  );
};

export default AccountButton;
