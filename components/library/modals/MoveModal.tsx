"use client";

import React, { useEffect, useState } from "react";
import Modal from "../../ui/Modal";
import { useRouter } from "next/navigation";
import { typeFolder } from "@/types";
import { FaArrowLeft } from "react-icons/fa";
import updateFolder from "@/actions/library/client/updateFolder";
import updateStack from "@/actions/library/client/updateStack";

export type MoveData = {
  id: number;
  type: "stack" | "folder";
  parentFolderId: number | null;
} | null;

interface Props {
  data: MoveData;
  setData: React.Dispatch<React.SetStateAction<MoveData>>;
  folders: typeFolder[];
}

function MoveModal({ data, setData, folders }: Props) {
  const router = useRouter();

  const [currentParentFolder, setCurrentParentFolder] = useState<number | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setCurrentParentFolder(data.parentFolderId);
      setLoading(false);
    }
  }, [data]);

  const onMove = async () => {
    if (!data) throw new Error("No data provided");
    switch (data.type) {
      case "folder":
        await updateFolder(data.id, { parent_folder: currentParentFolder });
        break;
      case "stack":
        await updateStack(data.id, { parent_folder: currentParentFolder });
        break;
    }

    setCurrentParentFolder(null);
    setLoading(true);
    router.refresh();
  };

  const onBack = () => {
    const parentFolder = folders.find(
      (folder) => folder.id === currentParentFolder
    );

    setCurrentParentFolder(parentFolder ? parentFolder.parent_folder : null);
  };

  const getCurrentFolderName = () => {
    const folder = folders.find((folder) => folder.id === currentParentFolder);
    return folder ? folder.name : "root";
  };

  return (
    !loading && (
      <Modal isOpen={data ? true : false} onClose={() => setData(null)}>
        <h3 className="font-bold text-lg">
          Move {data ? data.type : ""} to {getCurrentFolderName()}
        </h3>
        <button onClick={onBack} className="btn btn-circle btn-primary">
          <FaArrowLeft />
        </button>
        <ul>
          {folders.map(
            (folder) =>
              folder.parent_folder === currentParentFolder && (
                <li key={folder.id}>
                  <button
                    onClick={() => setCurrentParentFolder(folder.id)}
                    className="btn w-full mt-2"
                  >
                    {folder.name}
                  </button>
                </li>
              )
          )}
        </ul>
        <form method="dialog">
          <button className="btn btn-primary w-full mt-4" onClick={onMove}>
            Move
          </button>
        </form>
      </Modal>
    )
  );
}

export default MoveModal;
