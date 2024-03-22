import AuthButton from "../components/AuthButton";
import PrevPageButton from "@/components/PrevPageButton";

export default function Header() {
  return (
    <nav className="h-min w-full border-b border-b-foreground/10">
      <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm mx-auto">
        <PrevPageButton />
        <AuthButton />
      </div>
    </nav>
  );
}
