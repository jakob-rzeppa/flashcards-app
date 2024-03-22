import Link from "next/link";
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
}

function Course({
  data: { created_at, description, id, image_url, name, owner_id },
}: Props) {
  return (
    <Card
      href={"/library/" + id}
      title={name}
      description={description}
      imageUrl={
        image_url
          ? image_url
          : "https://mobisoftinfotech.com/resources/wp-content/uploads/2022/04/next-JS-framework.png"
      }
    />
  );
}

export default Course;
