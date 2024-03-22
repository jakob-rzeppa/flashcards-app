import Link from "next/link";
import React from "react";

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
    <Link href={"/library/" + id}>
      <div className="card card-compact w-60 bg-base-100 shadow-xl hover:bg-neutral">
        <figure className="h-28">
          <img
            src={
              image_url
                ? image_url
                : "https://mobisoftinfotech.com/resources/wp-content/uploads/2022/04/next-JS-framework.png"
            }
            alt="Image cant be loaded"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p>{description}</p>
        </div>
      </div>
    </Link>
  );
}

export default Course;
