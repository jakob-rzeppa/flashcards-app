"use client";

import React from "react";
import { typeFolder, typeStack } from "@/types";

interface Props {
  stacks: typeStack[];
  folders: typeFolder[];
}

function LibraryDisplay({ stacks, folders }: Props) {
  return (
    <>
      <div>
        <button className="btn btn-outline">Type</button>
        <button className="btn btn-outline">Order</button>
      </div>
      <table className="table table-zebra table-lg">
        <thead>
          <tr className="font-medium text-xl">
            <th>name</th>
            <th>last changed</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover">
            <td>test</td>
            <td>15.6.3493</td>
            <td></td>
          </tr>
          <tr className="hover">
            <td>test</td>
            <td>15.6.3493</td>
            <td></td>
          </tr>
          <tr className="hover">
            <td>test</td>
            <td>15.6.3493</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default LibraryDisplay;
