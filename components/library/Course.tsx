import React from "react";

import Card from "@/components/Card";

interface Props {
  data: {
    created_at: string;
    description: string | null;
    id: number;
    name: string;
    owner_id: string;
  };
  numOfFolders: number;
}

function Course({ data: { description, id, name }, numOfFolders }: Props) {
  return (
    <Card href={"/library/" + id}>
      <h1 className="text-bold text-2xl">{name}</h1>
      <p>{description}</p>
      <div className="badge badge-primary">{"Folders: " + numOfFolders}</div>
    </Card>
  );
}

export default Course;
