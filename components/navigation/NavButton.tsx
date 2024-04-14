import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";

interface Props {
  className?: string;
  href: string;
}

function NavButton({ className, href }: Props) {
  return (
    <Link to={href} className={`btn btn-circle btn-primary ${className}`}>
      <FiArrowLeft />
    </Link>
  );
}

export default NavButton;
