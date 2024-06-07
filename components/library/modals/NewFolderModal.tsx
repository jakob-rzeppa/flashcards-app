import React from "react";
import Modal from "../../Modal";

export type NewFolderModalData = {} | null;

interface Props {
  data: NewFolderModalData;
  setData: React.Dispatch<React.SetStateAction<NewFolderModalData>>;
}

function NewFolderModal({ data, setData }: Props) {
  return (
    <Modal isOpen={data ? true : false} onClose={() => setData(null)}>
      <h3 className="font-bold text-lg">Create New Folder</h3>
    </Modal>
  );
}

export default NewFolderModal;
