"use client";

import React, { useState } from "react";
import TagPicker from "./TagPicker";

function StackDisplay() {
  const [activeTags, setActiveTags] = useState<string[]>([]);
  return (
    <div className="w-full">
      <TagPicker activeTags={activeTags} setActiveTags={setActiveTags} />
    </div>
  );
}

export default StackDisplay;
