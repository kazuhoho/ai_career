"use client";

import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  className?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export default function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
  disabled,
  style,
}: ButtonProps) {
  const base =
    variant === "ghost"
      ? "py-[14px] px-9 text-[13px] text-mu hover:text-ch bg-transparent border border-ln hover:border-ch"
      : "py-[18px] px-[52px] text-sm font-bold tracking-widest text-white bg-ch hover:bg-ac border-none";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={style}
      className={`cursor-pointer transition-all duration-400 ${base} ${className}`}
    >
      {children}
    </button>
  );
}
