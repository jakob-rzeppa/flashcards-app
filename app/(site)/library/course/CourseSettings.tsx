"use client";

import { deleteElement } from "@/actions/library/client/deleteElement";
import updateElement from "@/actions/library/client/updateElement";
import Settings from "@/components/library/Settings";
import { useRouter } from "next/navigation";

interface Props {
  data: {
    created_at: string;
    description: string | null;
    id: number;
    name: string;
    owner_id: string;
  };
}

function CourseSettings({ data }: Props) {
  const router = useRouter();

  const onSave = async (name: string, description: string) => {
    await updateElement("courses", data.id, { name, description });

    router.refresh();
  };

  const onDelete = () => {
    deleteElement("courses", data.id);
    router.push("/library/");
  };

  return (
    <Settings
      data={{
        name: data.name,
        description: data.description ? data.description : "",
      }}
      onSave={onSave}
      onDelete={onDelete}
    />
  );
}

export default CourseSettings;
