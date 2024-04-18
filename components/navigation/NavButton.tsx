import Link from "next/link";
import React from "react";
import { FiArrowLeft } from "react-icons/fi";

interface Props {
  className?: string;
  href: string;
}

function NavButton({ className, href }: Props) {
  return (
    <a href={href} className={`btn btn-circle btn-primary ${className}`}>
      <FiArrowLeft size={20} />
    </a>
  );
}

export default NavButton;
