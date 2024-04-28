"use client";

import React from "react";

import Settings from "@/components/library/Settings";
import { deleteElement } from "@/actions/library/client/deleteElement";
import { useRouter } from "next/navigation";
import updateElement from "@/actions/library/client/updateElement";

interface Props {
  data: {
    course_id: number;
    created_at: string;
    description: string;
    id: number;
    name: string;
    owner_id: string;
  };
}

function FolderSettings({ data }: Props) {
  const router = useRouter();

  const onSave = async (name: string, description: string) => {
    await updateElement("folders", data.id, { name, description });

    router.refresh();
  };

  const onDelete = () => {
    deleteElement("folders", data.id);
    router.push("/library/course?id=" + data.course_id);
  };

  return (
    <Settings
      data={{ name: data.name, description: data.description }}
      onSave={onSave}
      onDelete={onDelete}
      buttonClassName="absolute top-2 right-2"
    />
  );
}

export default FolderSettings;
