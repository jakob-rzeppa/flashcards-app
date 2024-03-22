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

function Course({ data }: Props) {
  return (
    <div className="card w-60 bg-base-100 shadow-xl hover:bg-neutral">
      <figure className="h-28">
        <img
          src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          alt=""
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Course Name</h2>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Learn</button>
        </div>
      </div>
    </div>
  );
}

export default Course;
