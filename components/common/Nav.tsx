"use client";

import React from "react";

interface NavProps {
  extra?: React.ReactNode;
}

export default function Nav({ extra }: NavProps) {
  return (
    <nav className="p-5 px-8 flex justify-between items-center border-b border-ln">
      <div className="font-display text-[22px] font-bold tracking-tight">
        Career<span className="italic font-normal">Lab</span>
      </div>
      {extra || null}
    </nav>
  );
}
