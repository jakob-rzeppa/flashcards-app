import React from "react";

import StackContent from "./StackContent";
import NavButton from "@/components/navigation/NavButton";
import { getStackData } from "@/actions/library/getStackData";
import StackSettings from "./StackSettings";

interface Props {
  searchParams: { id: string };
}

async function StackPage({ searchParams: { id } }: Props) {
  // TODO error handling
  const { data, cards } = await getStackData(parseInt(id));

  return (
    <div className="mt-8">
      <NavButton
        href={`/library/folder?id=${data?.folder_id}`}
        className="absolute left-8"
      />
      <StackSettings data={data!} />
      <h1 className="text-4xl font-bold w-full text-center">{data?.name}</h1>
      <StackContent cardsData={cards ? cards : []} id={parseInt(id)} />
    </div>
  );
}

export default StackPage;
