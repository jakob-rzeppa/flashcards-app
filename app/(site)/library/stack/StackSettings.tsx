"use client";

import React from "react";

import Settings from "@/components/library/Settings";
import DeleteButton from "@/components/DeleteButton";
import { deleteElement } from "@/actions/library/deleteElement";
import { useRouter } from "next/navigation";

function StackSettings({ id, folderId }: { id: number; folderId: number }) {
  const router = useRouter();

  return (
    <Settings>
      <DeleteButton
        onClick={() => {
          deleteElement("stacks", id);
          router.push("/library/folder?id=" + folderId);
        }}
      />
    </Settings>
  );
}

export default StackSettings;
