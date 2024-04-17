"use client";

import SwipeCard from "@/components/learn/SwipeCard";
import React from "react";
import { IoChevronBack } from "react-icons/io5";

function LearnPage() {
  return (
    <div>
      <button className="btn btn-circle z-50 absolute top-3 left-3">
        <IoChevronBack />
      </button>
      <SwipeCard
        data={{ word: "word", definition: "definition" }}
        onSwipe={() => {}}
      />
    </div>
  );
}

export default LearnPage;
