import List from "@/components/List";

interface Props {
  params: { courseName: string };
}

function Course({ params }: Props) {
  const folders = [
    {
      title: "testFolder",
      href: "/library/test/testFolder",
      descriptions: { Sets: 4, Cards: 94 },
    },
    {
      title: "testFolder",
      href: "/library/test/testFolder",
      descriptions: { Sets: 4, Cards: 94 },
    },
  ];

  return <List title={params.courseName} list={folders} />;
}

export default Course;
