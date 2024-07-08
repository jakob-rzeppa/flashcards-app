"use client";

import React, { useState } from "react";
import Modal from "../../ui/Modal";
import { useRouter } from "next/navigation";
import updateFolder from "@/actions/library/client/updateFolder";
import updateStack from "@/actions/library/client/updateStack";

export type RenameData = {
  id: number;
  prevName: string;
  type: "stack" | "folder";
} | null;

interface Props {
  data: RenameData;
  setData: React.Dispatch<React.SetStateAction<RenameData>>;
}

function RenameModal({ data, setData }: Props) {
  const router = useRouter();

  const [name, setName] = useState("");

  const onCreate = async () => {
    if (!data) throw new Error("No data provided");
    switch (data.type) {
      case "folder":
        await updateFolder(data.id, { name });
        break;
      case "stack":
        await updateStack(data.id, { name, description: "" });
        break;
    }

    setName("");
    router.refresh();
  };

  return (
    <Modal isOpen={data ? true : false} onClose={() => setData(null)}>
      <h3 className="font-bold text-lg">Update {data ? data.type : ""}</h3>
      <input
        type="text"
        className="input input-primary w-full mt-4"
        placeholder={data ? data.prevName : "name"}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <form method="dialog">
        <button className="btn btn-primary w-full mt-4" onClick={onCreate}>
          Update
        </button>
      </form>
    </Modal>
  );
}

export default RenameModal;
