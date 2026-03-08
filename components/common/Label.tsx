import React from "react";

interface LabelProps {
  children: React.ReactNode;
}

export default function Label({ children }: LabelProps) {
  return (
    <p className="text-xs tracking-[0.2em] uppercase text-lm mb-5">
      {children}
    </p>
  );
}
