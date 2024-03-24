import React from "react";

import Card from "@/components/Card";

interface Props {
  data: {
    created_at: string;
    description: string | null;
    id: number;
    image_url: string | null;
    name: string;
    owner_id: string;
  };
  numOfFolders: number;
}

function Course({
  data: { description, id, image_url, name },
  numOfFolders,
}: Props) {
  return (
    <Card
      href={"/library/" + id}
      imageUrl={
        image_url
          ? image_url
          : "https://mobisoftinfotech.com/resources/wp-content/uploads/2022/04/next-JS-framework.png"
      }
    >
      <h1>{name}</h1>
      <p>{description}</p>
      <div className="badge badge-primary">{"Folders: " + numOfFolders}</div>
    </Card>
  );
}

export default Course;
