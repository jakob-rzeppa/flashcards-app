"use client";

import React, { useState } from "react";
import Modal from "../../Modal";
import { useRouter } from "next/navigation";
import createFolder from "@/actions/library/client/createFolder";

export type NewFolderModalData = {
  parentFolderId: number | null;
} | null;

interface Props {
  data: NewFolderModalData;
  setData: React.Dispatch<React.SetStateAction<NewFolderModalData>>;
}

function NewFolderModal({ data, setData }: Props) {
  const router = useRouter();

  const [name, setName] = useState("");

  const onCreate = async () => {
    if (!data) throw new Error("No data to create folder provided");
    await createFolder(name, data.parentFolderId);

    setName("");
    router.refresh();
  };

  return (
    <Modal isOpen={data ? true : false} onClose={() => setData(null)}>
      <h3 className="font-bold text-lg">Create New Folder</h3>
      <input
        type="text"
        className="input input-primary w-full mt-4"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <form method="dialog">
        <button className="btn btn-primary w-full mt-4" onClick={onCreate}>
          Create
        </button>
      </form>
    </Modal>
  );
}

export default NewFolderModal;
