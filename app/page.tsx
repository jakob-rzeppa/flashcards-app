import Link from "next/link";

export default function Home() {
  const links = ["/library"];

  return (
    <div>
      {links.map((link) => (
        <Link href={link} key={link}>
          {link}
        </Link>
      ))}
    </div>
  );
}
