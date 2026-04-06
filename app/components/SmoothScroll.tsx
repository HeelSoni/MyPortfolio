"use client";
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return <div className="relative z-0 antialiased w-full">{children}</div>;
}
