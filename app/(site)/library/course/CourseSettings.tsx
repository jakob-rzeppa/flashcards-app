"use client";

import React from "react";

import Settings from "@/components/library/Settings";
import DeleteButton from "@/components/DeleteButton";
import { deleteElement } from "@/actions/library/deleteElement";
import { useRouter } from "next/navigation";

function CourseSettings({ id }: { id: number }) {
  const router = useRouter();

  return (
    <Settings>
      <DeleteButton
        onClick={() => {
          deleteElement("courses", id);
          router.push("/library/");
        }}
      />
    </Settings>
  );
}

export default CourseSettings;
