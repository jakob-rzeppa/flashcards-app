import Card from "@/components/Card";
import React from "react";

interface Props {
  data: {
    course_id: number;
    created_at: string;
    id: number;
    name: string;
    owner_id: string;
  };
}

function Folder({ data: { id, name, course_id } }: Props) {
  return (
    <Card href={"/library/" + course_id + "/" + id} imageUrl="">
      <h1>{name}</h1>
    </Card>
  );
}

export default Folder;
