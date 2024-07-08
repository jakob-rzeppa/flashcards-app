import React, { ReactNode } from "react";

interface Props {
  elements: ReactNode[];
  onClick: () => void;
  key?: any;
}

function Row({ elements, onClick, key }: Props) {
  return (
    <tr className="hover cursor-pointer" onClick={onClick} key={key}>
      {elements.map((element, index) => (
        <td className="text-lg" key={index}>
          {element}
        </td>
      ))}
    </tr>
  );
}

export default Row;
