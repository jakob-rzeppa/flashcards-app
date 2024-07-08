import React, { ReactNode } from "react";

interface Props {
  elements: ReactNode[];
  onClick: () => void;
}

function Row({ elements, onClick }: Props) {
  return (
    <tr className="hover cursor-pointer" onClick={onClick}>
      {elements.map((element, index) => (
        <td className="text-lg" key={index}>
          {element}
        </td>
      ))}
    </tr>
  );
}

export default Row;
