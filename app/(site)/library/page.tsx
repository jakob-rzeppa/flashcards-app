import React, { useCallback, useState } from "react";

import BackgroundBox from "@/components/BackgroundBox";
import "./tagsStyles.css";
import TagPicker from "@/components/library/TagPicker";

async function LibraryPage() {
  return (
    <div className="flex flex-col justify-center items-center gap-8 mt-8">
      <h2 className="text-3xl">Courses</h2>
      <BackgroundBox>
        <TagPicker />
      </BackgroundBox>
    </div>
  );
}

export default LibraryPage;
