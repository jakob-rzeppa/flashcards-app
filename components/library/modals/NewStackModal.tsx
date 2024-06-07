import React from "react";
import Modal from "../../Modal";

export type NewStackModalData = {} | null;

interface Props {
  data: NewStackModalData;
  setData: React.Dispatch<React.SetStateAction<NewStackModalData>>;
}

function NewStackModal({ data, setData }: Props) {
  return (
    <Modal isOpen={data ? true : false} onClose={() => setData(null)}>
      <h3 className="font-bold text-lg">Create New Stack</h3>
    </Modal>
  );
}

export default NewStackModal;
