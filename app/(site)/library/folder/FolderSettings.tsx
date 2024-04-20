"use client";

import React from "react";

import Settings from "@/components/library/Settings";
import DeleteButton from "@/components/DeleteButton";
import { deleteElement } from "@/actions/library/client/deleteElement";
import { useRouter } from "next/navigation";

function FolderSettings({ id, courseId }: { id: number; courseId: number }) {
  const router = useRouter();

  return (
    <Settings>
      <DeleteButton
        onClick={() => {
          deleteElement("folders", id);
          router.push("/library/course?id=" + courseId);
        }}
      />
    </Settings>
  );
}

export default FolderSettings;
