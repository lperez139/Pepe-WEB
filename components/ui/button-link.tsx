"use client";

import Link from "next/link";
import { MouseEvent, ReactNode } from "react";
import { scrollToHash } from "@/lib/scroll-to-hash";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!href.startsWith("#")) {
      return;
    }

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    scrollToHash(href);
  };

  const base =
    "group inline-flex items-center justify-center rounded-xl border px-5 py-3 text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-glow)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]";
  const variants = {
    primary:
      "border-[color:var(--primary)] bg-[color:var(--primary)] text-[color:var(--text-main)] shadow-[0_0_0_0_rgba(34,211,238,0)] hover:-translate-y-0.5 hover:shadow-[0_12px_34px_-20px_rgba(34,211,238,0.6)]",
    secondary:
      "border-[color:var(--border)] bg-transparent text-[color:var(--text-main)] hover:-translate-y-0.5 hover:border-[color:rgba(34,211,238,0.35)] hover:bg-[color:rgba(255,255,255,0.02)]",
  };

  return (
    <Link href={href} onClick={handleClick} className={`${base} ${variants[variant]} ${className}`}>
      <span className="relative overflow-hidden">
        <span className="block transition-transform duration-300 group-hover:-translate-y-0.5">{children}</span>
      </span>
    </Link>
  );
}
