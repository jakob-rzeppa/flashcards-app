"use client";

import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

function Button({ children, ...rest }: Props) {
  //return <button {...rest}></button>;
  return <div>Button</div>;
}

export default Button;
