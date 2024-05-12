import React from "react";

import BackgroundBox from "@/components/BackgroundBox";
import Link from "next/link";

async function LibraryPage() {
  return (
    <div className="flex flex-col justify-center items-center gap-8 mt-8">
      <h2 className="text-3xl">Courses</h2>
      <BackgroundBox>Test</BackgroundBox>
    </div>
  );
}

export default LibraryPage;
