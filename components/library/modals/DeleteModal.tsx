"use client";

import React, { useState } from "react";
import Modal from "../../ui/Modal";
import { useRouter } from "next/navigation";
import { deleteFolder } from "@/actions/library/client/deleteFolder";
import { deleteStack } from "@/actions/library/client/deleteStack";

export type DeleteData = {
  id: number;
  type: "stack" | "folder";
} | null;

interface Props {
  data: DeleteData;
  setData: React.Dispatch<React.SetStateAction<DeleteData>>;
}

function DeleteModal({ data, setData }: Props) {
  const router = useRouter();

  const onCreate = async () => {
    if (!data) throw new Error("No data provided");
    switch (data.type) {
      case "folder":
        await deleteFolder(data.id);
        break;
      case "stack":
        await deleteStack(data.id);
        break;
    }

    router.refresh();
  };

  return (
    <Modal isOpen={data ? true : false} onClose={() => setData(null)}>
      <h3 className="font-bold text-lg">Update {data ? data.type : ""}</h3>
      <form method="dialog">
        <button className="btn btn-primary w-full mt-4" onClick={onCreate}>
          Delete (This action can not be undone
          {data?.type === "folder" &&
            "and will delete all folders and stacks inside the Folder"}
          !)
        </button>
      </form>
    </Modal>
  );
}

export default DeleteModal;
