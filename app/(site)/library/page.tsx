import React, { useCallback, useState } from "react";

import BackgroundBox from "@/components/BackgroundBox";
import "./tagsStyles.css";
import StackDisplay from "@/components/library/StackDisplay";

async function LibraryPage() {
  return (
    <div className="flex flex-col justify-center items-center gap-8 mt-8">
      <h2 className="text-3xl">Courses</h2>
      <BackgroundBox>
        <StackDisplay />
      </BackgroundBox>
    </div>
  );
}

export default LibraryPage;
