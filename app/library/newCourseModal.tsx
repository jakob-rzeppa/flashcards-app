"use client";

import React, { useState } from "react";
import { createClient } from "@/utils/supabase/client";

import Modal from "@/components/Modal";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
}

function NewCourseModal({ id }: Props) {
  const supabase = createClient();
  const router = useRouter();

  const [isLoading, setLoading] = useState(false);

  const [newCourseTitle, setNewCourseTitle] = useState("");
  const [newCourseDescription, setNewCourseDescription] = useState("");

  const handleCreateCourse = async () => {
    if (newCourseTitle === "") {
      alert("you need to put in a title!");
      return;
    }

    setLoading(true);
    const userId = (await supabase.auth.getUser()).data.user?.id;
    // TODO Image
    const { data, error } = await supabase
      .from("courses")
      .insert([
        {
          name: newCourseTitle,
          description: newCourseDescription,
          owner_id: userId!,
        },
      ])
      .select();

    if (error) {
      throw error;
    } else {
      console.log(data);
    }

    router.push("/library/" + data[0].id);
    setLoading(false);
  };
  return (
    <Modal id={id}>
      {!isLoading ? (
        <>
          <h3 className="font-bold text-lg">Create a Course</h3>
          <input
            type="text"
            className="input input-primary mt-4"
            placeholder="title"
            onChange={(event) => setNewCourseTitle(event.target.value)}
          />
          <br />
          <input
            type="text"
            className="input input-primary mt-2"
            placeholder="description"
            onChange={(event) => setNewCourseDescription(event.target.value)}
          />
          <br />
          <button className="btn btn-primary mt-4" onClick={handleCreateCourse}>
            Create
          </button>
        </>
      ) : (
        <h1 className="text-3xl font-bold">Create Course...</h1>
      )}
    </Modal>
  );
}

export default NewCourseModal;
