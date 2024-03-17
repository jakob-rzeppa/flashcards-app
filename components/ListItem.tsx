import React from "react";
import Link from "next/link";

interface Props {
  title: string;
  descriptions: { [info: string]: number };
  href: string;
}

function ListItem({ title, descriptions, href }: Props) {
  //TODO functionality; progress Bar
  return (
    <li className="flex flex-col py-3 px-2 border-b border-gray-200 rounded-md hover:bg-gray-200">
      <Link href={href}>
        <span className="text-lg">{title}</span>
        {Object.keys(descriptions).map((info) => (
          <p className="text-gray-600">{info + ": " + descriptions[info]}</p>
        ))}
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div className="bg-blue-500 h-full rounded-full w-1/2"></div>
        </div>
      </Link>
    </li>
  );
}

export default ListItem;
